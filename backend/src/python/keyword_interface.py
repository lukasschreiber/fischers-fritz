import keywords
import sys

text = sys.argv[0]

result = [(keyword, n, (keyword.start_char, keyword.end_char)) for keyword, n in keywords.get_keywords(text)]
print(result)
sys.stdout.flush()

