from typing import List, Optional, Literal, Tuple
from pydantic import BaseModel
from spacy.tokens import Span

class GoogleReview(BaseModel):
    author_name: str
    author_url: str
    profile_photo_url: str
    rating: int
    relative_time_description: str
    text: str
    time: int

class KeywordModel(BaseModel):
    n: int
    text: str
    bounds: Tuple[int, int]

ReviewSource = Literal["google", "greetsiel-apartments", "fewo-direct"]

#YakeKeyword = Tuple[str, float]

class YakeKeyword(BaseModel):
    text: str
    score: float    

class Keyword(BaseModel):
    span: Span
    score: float
    
    class Config:
        arbitrary_types_allowed = True

class ReviewDetail(BaseModel):
    label: str
    rating: int

class Review(BaseModel):
    time: int
    relativeTimeDescription: str
    profileImage: Optional[str] = None
    rating: float
    title: Optional[str] = None
    text: str
    authorName: str
    details: Optional[List[ReviewDetail]] = None
    keywords: List[KeywordModel]
    source: ReviewSource

SortOptions = Literal["rating_and_length_desc", "date_desc"]

class ReviewResponseType(BaseModel):
    result: List[Review]
    
class GoogleReviews(BaseModel):
    reviews: List[GoogleReview]

class GoogleReviewResponseType(BaseModel):
    result: GoogleReviews

class Image(BaseModel):
    src: str
    title: str
