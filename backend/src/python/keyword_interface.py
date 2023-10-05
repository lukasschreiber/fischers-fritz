import keywords
import json

text = input()
print(json.dumps([(keyword.text, n, (keyword.start_char, keyword.end_char)) for keyword, n in keywords.get_keywords(text)]))
