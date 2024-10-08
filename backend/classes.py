from typing import List, Optional, Literal, Tuple
from pydantic import BaseModel

class GoogleReview(BaseModel):
    author_name: str
    author_url: str
    profile_photo_url: str
    rating: int
    relative_time_description: str
    text: str
    time: int

class Keyword(BaseModel):
    n: int
    text: str
    bounds: Tuple[int, int]

ReviewSource = Literal["google", "greetsiel-apartments", "fewo-direct"]

class ReviewDetail(BaseModel):
    label: str
    rating: int

class Review(BaseModel):
    time: int
    relative_time_description: str
    profile_image: Optional[str] = None
    rating: int
    title: Optional[str] = None
    text: str
    author_name: str
    details: Optional[List[ReviewDetail]] = None
    keywords: List[Keyword]
    source: ReviewSource

class ReviewRequest(BaseModel):
    sort: Literal["rating_and_length_desc", "date_desc"]

class ReviewResponseType(BaseModel):
    result: List[Review]

class GoogleReviewResponseType(BaseModel):
    reviews: List[GoogleReview]

class Image(BaseModel):
    src: str
    title: str
