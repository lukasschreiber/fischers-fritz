import os
import json
from typing import TypeVar, Optional
from pydantic.json import pydantic_encoder

T = TypeVar('T')

CACHE_DIR = "./cache"

def create_cache_dir():
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)

def init_cache():
    create_cache_dir()

def cache_store(dir: str, entry: T) -> None:
    with open(f"{CACHE_DIR}/{dir}.json", "w", encoding="utf-8") as f:
        json.dump(entry, f, default=pydantic_encoder)

        
def cache_get(dir: str) -> Optional[T]:
    path = f"{CACHE_DIR}/{dir}.json"
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def cache_has(dir: str) -> bool:
    path = f"{CACHE_DIR}/{dir}.json"
    return os.path.exists(path)

def cache_clear():
    if os.path.exists(CACHE_DIR):
        os.rmdir(CACHE_DIR)
    create_cache_dir()
