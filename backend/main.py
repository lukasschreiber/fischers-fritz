from fastapi import FastAPI, Query
from typing import Optional
from classes import ReviewResponseType, SortOptions
from dotenv import load_dotenv

load_dotenv()

from fetcher import get_google_reviews, get_greetsiel_apartments_reviews, get_traum_ferienwohnungen_reviews
from utils.cache import init_cache
from fastapi.middleware.cors import CORSMiddleware

app: FastAPI = FastAPI()

init_cache()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8091",
        "https://fischers-fritz-greetsiel.de"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/reviews")
async def get_reviews(sort: SortOptions = "rating_and_length_desc") -> ReviewResponseType:
    google_reviews = await get_google_reviews()
    greetsiel_apartments_reviews = await get_greetsiel_apartments_reviews()
    traum_ferienwohnungen_reviews = await get_traum_ferienwohnungen_reviews()
    
    combined = google_reviews + greetsiel_apartments_reviews + traum_ferienwohnungen_reviews
    
    if sort == "rating_and_length_desc":
        return ReviewResponseType(result=sorted(combined, key=lambda x: (x['rating'], len(x['text'])), reverse=True))
    elif sort == "date_desc":
        return ReviewResponseType(result=sorted(combined, key=lambda x: x['time'], reverse=True))
    elif sort == "longest_first":
        return ReviewResponseType(result=sorted(combined, key=lambda x: len(x['text']), reverse=True))
    elif sort == "shortest_first":
        return ReviewResponseType(result=sorted(combined, key=lambda x: len(x['text'])))