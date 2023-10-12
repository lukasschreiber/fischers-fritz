import keywords
import json

while True:
    text_id = input()
    text = input()
    print(json.dumps((text_id, [(keyword.text, n, (keyword.start_char, keyword.end_char))
          for keyword, n in keywords.get_keywords(text)])))