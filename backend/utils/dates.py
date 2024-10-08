from datetime import datetime

def parse_date(date: str) -> int:
    # the date we get is like "Mai 2022" or "Juni 2024"
    # we need to convert this to a timestamp
    month, year = date.split(" ")
    month = month.lower()
    months = {
        "januar": 1,
        "februar": 2,
        "märz": 3,
        "april": 4,
        "mai": 5,
        "juni": 6,
        "juli": 7,
        "august": 8,
        "september": 9,
        "oktober": 10,
        "november": 11,
        "dezember": 12
    }
    
    return int(datetime(year=int(year), month=months[month], day=1).timestamp())