import math
import re
import spacy
import yake
from spacy.tokens import Doc, Span

FORBIDDEN_WORDS = ["Ferienhaus", "Fischers Fritz", "Poppen", "Poppens", "Fischer's Fritz", "Fritz",
                   "Ferienappartements", "Greetsieler Ferienappartements", "Greetsieler", "Urlaub", "Übergabe"]
YakeKeyword = tuple[str, float]
Keyword = tuple[Span, float]

nlp = spacy.load("de_core_news_sm")


def get_yake_keywords(text: str) -> list[YakeKeyword]:
    """
    Returns a list of keywords extracted by YAKE
    :param text: the text to parse
    :return: the list of Keywords, consisting of a tuple with text and the ngram value
    """
    extractor = yake.KeywordExtractor(lan="de", n=3, dedupLim=0.2, dedupFunc="seqm", top=16, features=None)
    kw = extractor.extract_keywords(text)
    return [(keyword, n) for keyword, n in list(filter(lambda x: x[1] < 0.5, kw))]


def convert_to_spacy_span(doc: Doc, keywords: list[YakeKeyword]) -> list[Keyword]:
    """
    Converts the text returned by Spacy into tokens found in the given doc
    :param doc: a doc parsed with spaCy
    :param keywords: a list of Yake keywords
    :return: a list of Keywords where the text has been replaced with the spaCy Tokenization
    """
    computed_keywords = []
    for kw in keywords:
        keyword, n = kw
        match = re.search(r'\b{}\b'.format(re.escape(keyword)), doc.text)
        # problem with e.g. test-
        if match:
            start_index = match.start()
            end_index = start_index + len(keyword)
            computed_keywords.append((doc.char_span(start_index, end_index), n))
    return computed_keywords


def split_conjunctions(keywords: list[Keyword]) -> list[Keyword]:
    """
    Splits conjunctions but only in compound sentences
    not in enumerations
    :param keywords: a list of keywords
    :return: a list of keywords which has the same size as the input or is longer
    """
    split_keywords = []

    for keyword, weight in keywords:
        start_index = 0
        current_weight = math.inf
        phrase_doc = nlp(keyword.text)
        for i, token in enumerate(keyword):
            # we use the dependency analysis of the keyword only as this seems to
            # give better results in our use case
            if token.text == "und" and phrase_doc[i].dep_ == "ROOT" and current_weight < math.inf:
                split_keywords.append((keyword[start_index:i], current_weight))
                start_index = i + 1
                current_weight = math.inf
            else:
                current_weight = min(current_weight, weight)

        if current_weight < math.inf:
            split_keywords.append((keyword[start_index:], current_weight))

    return split_keywords


def merge_connected_keywords(doc: Doc, keywords: list[Keyword]) -> list[Keyword]:
    """
    merges two keywords if the respective spans overlap or lye directly
    back to back with less than 1 character distance

    the weights are combined by calculating the minimum weight

    :param doc: a doc parsed with spaCy
    :param keywords: a list of keywords that might contain duplicates
    :return: the same list of keywords if there are no duplicates or a shorter list where all duplicates are merged
    """
    keywords.sort(key=lambda x: x[0].start_char)

    merged_keywords: list[Keyword] = []

    for span, weight in keywords:
        if len(merged_keywords) == 0:
            merged_keywords.append((span, weight))
        else:
            last_span, last_weight = merged_keywords[-1]
            if span.start_char <= last_span.end_char + 1:
                merged_span = doc.char_span(min(last_span.start_char, span.start_char),
                                            max(span.end_char, last_span.end_char))
                merged_weight = min(last_weight, weight)
                merged_keywords[-1] = (merged_span, merged_weight)
            else:
                merged_keywords.append((span, weight))

    return merged_keywords


def remove_forbidden_words(doc: Doc, keywords: list[Keyword]) -> list[Keyword]:
    filtered_keywords: list[Keyword] = []
    for keyword, weight in keywords:
        for forbidden_word in FORBIDDEN_WORDS:
            if keyword is None:
                continue
            if keyword.text.startswith(forbidden_word):
                keyword = doc.char_span(keyword.start_char + len(forbidden_word) + 1, keyword.end_char)
            elif keyword.text.endswith(forbidden_word):
                keyword = doc.char_span(keyword.start_char, keyword.end_char - len(forbidden_word) - 1)
            elif forbidden_word in keyword.text:
                # if the keyword is not on the edge we discard the entire string
                keyword = None

        if keyword is not None and keyword.text != "":
            filtered_keywords.append((keyword, weight))

    return filtered_keywords


def expand_keywords(doc: Doc, keywords: list[Keyword]) -> list[Keyword]:
    expanded_keywords = []
    for keyword, weight in keywords:
        start_token = doc[keyword[0].i] if keyword[0].i >= 0 else None
        end_token = doc[keyword[-1].i] if keyword[-1].i < len(doc) else None

        if start_token is None or end_token is None:
            expanded_keywords.append((keyword, weight))
            continue

        next_token = doc[end_token.i + 1] if end_token.i + 1 < len(doc) else None
        previous_token = doc[start_token.i - 1] if start_token.i > 0 else None

        # if end_token.i + 3 < len(doc):
        #     print(next_token.text, next_token.dep_, doc[end_token.i + 2].dep_, doc[end_token.i + 3].dep_)

        # if the last token is an adjective, we want to include any potentially following Noun
        if end_token.pos_ == "ADJ" and next_token and next_token.pos_ == "NOUN":
            keyword = doc.char_span(keyword.start_char, next_token.idx + len(next_token))

        # if the first token is a noun, we want to include any potential previous adjectives
        if start_token.pos_ == "NOUN" and previous_token and previous_token.pos_ == "ADJ":
            keyword = doc.char_span(previous_token.idx, keyword.end_char)

        # working with a context of three characters to the right
        look_ahead = 3
        end_of_span = doc[end_token.i + look_ahead] if end_token.i + look_ahead < len(doc) else None
        if end_of_span:
            next_span = doc.char_span(keyword.end_char + 1, end_of_span.idx + len(end_of_span))
            if next_span is not None:
                # if there is a token within the 3 next tokens that has the dep tag svp and points to a token within the
                # keyword then we want to extend the keyword until this token
                for token in next_span:
                    if token.dep_ == "svp" and token.head.pos_ == "VERB" and keyword.start_char <= token.head.idx < keyword.end_char:
                        keyword = doc.char_span(keyword.start_char, token.idx + len(token.text))
                        break

                # if the last token is a noun, followed by a post-nominal modifier, then we want to highlight the
                # modification as well
                if next_span[0].dep_ == "mnr" or next_span[0].dep_ == "mo":
                    index = 0
                    for i in range(1, len(next_span)):
                        if (next_span[i].dep_ == "nk" and next_span[i].head == next_span[0]) or (
                                next_span[i].dep_ == "mo" and next_span[i].head == end_token):
                            index = i
                    keyword = doc.char_span(keyword.start_char, next_span[index].idx + len(next_span[index].text))

        # working with a context of three characters to the left
        look_behind = 3
        start_of_span = doc[start_token.i - look_behind] if start_token.i - look_behind > 0 else None
        if start_of_span:
            previous_span = doc.char_span(start_of_span.idx, keyword.start_char - 1)
            if previous_span is not None:
                for token in previous_span:
                    # takes also all determiners like "der", "die" and "das"
                    if token.dep_ == "nk" and token.head == start_token:
                        keyword = doc.char_span(token.idx, keyword.end_char)
                        break

        expanded_keywords.append((keyword, weight))

    return expanded_keywords


def remove_single_words(keywords: list[Keyword]) -> list[Keyword]:
    # remove if it contains any "other" tokens like á
    # remove everything that does not provide benefit on its own
    # Det + Noun
    # single words that are no Adjectives or Adverbs
    return [(keyword, n) for keyword, n in keywords if not any([token.pos_ == "X" for token in keyword]) and
            (len(keyword) > 1 or keyword[0].pos_ == "ADJ" or keyword[0].pos_ == "ADV")]


def get_keywords(text: str) -> list[Keyword]:
    yake_keywords = get_yake_keywords(text)
    doc = nlp(text)

    # we do not want to work with text, but with spacy tokens
    keywords = convert_to_spacy_span(doc, yake_keywords)

    # all keywords that are directly connected, i.e. the spans
    # are right after each other or overlap, should be connected
    keywords = merge_connected_keywords(doc, keywords)

    # all compound sentences within a keyword should be split
    # into their pieces, the "und" in the middle is not of interest
    keywords = split_conjunctions(keywords)

    # before we go on with the processing we want to remove all forbidden words
    # forbidden are the name of the place, as well as too common terms of
    # the domain that are otherwise rare like "Ferienhaus". Other forbidden
    # terms could include "Geschmack" or other indicators of subjective taste
    keywords = remove_forbidden_words(doc, keywords)

    # we want to expand the tokens to be as grammatically sound as possibly
    # as well as to contain as much describing information as possible.
    keywords = expand_keywords(doc, keywords)
    keywords = merge_connected_keywords(doc, keywords)

    # we want to remove all keywords that only consist of one token
    # only single adjectives are allowed
    keywords = remove_single_words(keywords)
    return keywords