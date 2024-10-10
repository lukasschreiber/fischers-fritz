from typing import List, Optional, Literal, Tuple
from pydantic import BaseModel
import hashlib
import json


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


ReviewSource = Literal["google", "greetsiel-apartments", "fewo-direct", "traum-ferienwohnungen"]

class ReviewDetail(BaseModel):
    label: str
    rating: int


class Review(BaseModel):
    id: Optional[str] = None
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.id = hashlib.md5(
            json.dumps(
                {
                    "source": self.source,
                    "authorName": self.authorName,
                }, sort_keys=True
            ).encode()
        ).hexdigest()
        
        # strip the text and title to remove all whitespaces including newlines
        self.text = self.text.strip()
        if len(self.text) <= 1:
            self.text = ""
        self.authorName = self.authorName.strip()
        if self.title is not None:
            self.title = self.title.strip()


SortOptions = Literal["rating_and_length_desc", "date_desc", "longest_first", "shortest_first"]


class ReviewResponseType(BaseModel):
    result: List[Review]


class GoogleReviews(BaseModel):
    reviews: List[GoogleReview]


class GoogleReviewResponseType(BaseModel):
    result: GoogleReviews


class Image(BaseModel):
    src: str
    title: str
