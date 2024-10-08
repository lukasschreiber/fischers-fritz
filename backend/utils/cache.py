import os
import json
from typing import TypeVar, Optional

T = TypeVar('T')

CACHE_DIR = "./cache"

def create_cache_dir():
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)

def init():
    create_cache_dir()

def store(entry: T, namespace: str) -> None:
    with open(f"{CACHE_DIR}/{namespace}.json", "w", encoding="utf-8") as f:
        json.dump(entry, f)

def get(namespace: str) -> Optional[T]:
    path = f"{CACHE_DIR}/{namespace}.json"
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def has(namespace: str) -> bool:
    path = f"{CACHE_DIR}/{namespace}.json"
    return os.path.exists(path)

def clear():
    if os.path.exists(CACHE_DIR):
        os.rmdir(CACHE_DIR)
    create_cache_dir()
