from openai import OpenAI
import os
from typing import List
from classes import KeywordModel, Review
from bs4 import BeautifulSoup
import json
from pydantic.json import pydantic_encoder

client = OpenAI()

def get_keywords(review: Review) -> List[KeywordModel]:
    
    # we have a data/keywords.json with a dict. If it contains review.id, we return the keywords
    # if not, we generate them and store them in the file
    
    if os.path.exists("data/keywords.json"):
        with open("data/keywords.json", "r") as f:
            keywords = json.load(f)
            if review.id in keywords:
                return keywords[review.id]
    
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": "Given the review \"{text}\" highlight the most important passages to help other users to decide to book the apartment. The name of the apartment and the company Greetsieler Ferienaparmants are not relevant. It is also irrelevant what the reviewer did, for example a boat tour. To highlight the text use html <b></b> tags and do not write anything besides the original text with the added <b> tags. Make sure that at least one passage is highlighted but not too much of the text is highlighted. Highlighted areas should not bee too long and rather split into multiple passages. Keep all texts in the language that they have been written in. Do not change a word.".format(text=review.text),
            },
        ],
    )
        
    highlighted_text = completion.choices[0].message.content
    soup = BeautifulSoup(highlighted_text, "html.parser")
    keywords = []
    
    raw_text = review.text
    
    for bold_tag in soup.find_all('b'):
        highlighted_word = bold_tag.text
        start = raw_text.find(highlighted_word)
        end = start + len(highlighted_word)
        keywords.append(KeywordModel(text=highlighted_word, bounds=(start, end), n=1))
        
    if os.path.exists("data/keywords.json"):
        with open("data/keywords.json", "r") as f:
            keywords_dict = json.load(f)
            keywords_dict[review.id] = keywords
        with open("data/keywords.json", "w") as f:
            json.dump(keywords_dict, f, default=pydantic_encoder)
            
    
    return keywords

