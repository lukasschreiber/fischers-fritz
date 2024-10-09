from typing import List
from classes import Review, GoogleReviewResponseType, ReviewDetail
from utils.cache import cache_get, cache_store
from utils.gpt_keywords import get_keywords as get_gpt_keywords
import httpx
from utils.dates import parse_date, parse_german_date
from bs4 import BeautifulSoup
import re
import os
import json

titles = {}

with open("data/titles.json", "r", encoding="utf-8") as f:
    titles = json.load(f)

async def get_google_reviews() -> List[Review]:
    cache_entry = cache_get("google")
    if cache_entry is not None:
        return cache_entry
    
    google_api = (
        f"https://maps.googleapis.com/maps/api/place/details/json?place_id={os.getenv('GOOGLE_PLACE_ID')}"
        f"&fields=reviews&key={os.getenv('GOOGLE_API_KEY')}&language=de"
    )

    async with httpx.AsyncClient() as client:
        response = await client.get(google_api)
        data = GoogleReviewResponseType.parse_obj(response.json())

    reviews: List[Review] = []
    for review in data.result.reviews:
        text = review.text.replace("\n", " ").replace("  ", " ")
        
        review = Review(
            authorName=review.author_name,
            rating=review.rating,
            text=text,
            keywords=[],
            time=review.time,
            profileImage=review.profile_photo_url,
            relativeTimeDescription=review.relative_time_description,
            source="google"
        )
        
        review.keywords = get_gpt_keywords(review)
        
        reviews.append(review)

    cache_store("google", reviews)
    return reviews

async def get_greetsiel_apartments_reviews() -> List[Review]:
    cache_entry = cache_get("greetsiel-apartments")
    if cache_entry is not None:
        return cache_entry
    
    reviews: List[Review] = []
    
    # we only have the html, so we need to parse it
    # download the html
    async with httpx.AsyncClient() as client:
        response = await client.get("https://www.apartments-greetsiel.de/Nordsee/Ostfriesland/Greetsiel/Fischers.Fritz")
        html = response.text
        
    soup = BeautifulSoup(html, "lxml")
    review_elements = soup.select(".feedbacks .feedback")
    
    for review in review_elements:        
        text_element = review.select_one(".guest-text")
        
        details = []
        for rating in review.select(".feedback-comment-header .ratings .rating"):
            # Use .get() to safely access the attribute
            label = rating.get("data-original-title")
            if label:  # Proceed only if the attribute exists
                details.append(ReviewDetail(label=label, rating=int(rating.text.strip())))
                
        review = Review(
            authorName=review.select_one(".authot-bl").text,
            rating=float(re.search(r'\{\{getFormatedRating\((\d+(?:\.\d+)?)\)\}\}', review.select_one(".feedback-rating-header .tooltip-bl").text).group(1)),
            title=review.select_one(".feedback-comment-header .title").text,
            text=text_element.text if text_element is not None else "",
            keywords=[],
            time=parse_date(review.select_one(".feedback-caption .author").text),
            source="greetsiel-apartments",
            relativeTimeDescription="",
            details=details
        )
        
        if review.title == "":
            review.title = titles.get(review.id, "")
        
        if review.text != "":
            review.keywords = get_gpt_keywords(review)
        
        reviews.append(review)
        
    cache_store("greetsiel-apartments", reviews)
    return reviews
    
    
# https://www.traum-ferienwohnungen.de/297743/

async def get_traum_ferienwohnungen_reviews() -> List[Review]:
    cache_entry = cache_get("traum-ferienwohnungen")
    if cache_entry is not None:
        return cache_entry
    
    reviews: List[Review] = []
    
    # we only have the html, so we need to parse it
    # download the html
    async with httpx.AsyncClient() as client:
        response = await client.get("https://www.traum-ferienwohnungen.de/297743/")
        html = response.text
        
    soup = BeautifulSoup(html, "lxml")
    review_elements = soup.select("[data-key=ratingItems] section.rating")
    
    for review in review_elements:        
        text_element = review.select_one(".rating__text")
                
        review = Review(
            authorName=review.select_one("p[data-key=reviewer]").text.replace("Von ", ""),
            rating=float(review.select_one(".rating-score__value[data-key=avg]").text),
            title=review.select_one(".rating__heading").text,
            text=text_element.text if text_element is not None else "",
            keywords=[],
            time=parse_german_date(review.select_one(".rating__travel-date").text),
            source="traum-ferienwohnungen",
            relativeTimeDescription="",
        )
        
        if review.title == "":
            review.title = titles.get(review.id, "")
        
        if review.text != "":
            review.keywords = get_gpt_keywords(review)
        
        reviews.append(review)
        
    cache_store("traum-ferienwohnungen", reviews)
    return reviews