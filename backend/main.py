from fastapi import FastAPI
from classes import ReviewResponseType

app: FastAPI = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/reviews")
def get_reviews() -> ReviewResponseType:
    return ReviewResponseType(result=[])
