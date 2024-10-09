from datetime import datetime

def parse_date(date: str) -> int:
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

def parse_german_date(date: str) -> int:
    day, month, year = date.split(".")
    
    return int(datetime(year=int(year), month=int(month), day=int(day)).timestamp())