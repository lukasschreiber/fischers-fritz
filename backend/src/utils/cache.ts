import { ReviewSource } from "@fischers-fritz/types";
import fs from "fs";

const CACHE_DIR = "./cache";

function createCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
}

export function init() {
  createCacheDir();
}

export function store<T>(entry: T, namespace: ReviewSource): void {
  fs.writeFileSync(`${CACHE_DIR}/${namespace}.json`, JSON.stringify(entry), {
    encoding: "utf-8",
    flag: "w",
  });
}

export function get<T>(namespace: ReviewSource): T | undefined {
  const path = `${CACHE_DIR}/${namespace}.json`;
  if (!fs.existsSync(path)) return undefined;
  return JSON.parse(fs.readFileSync(path, "utf-8")) as T;
}

export function has(namespace: ReviewSource): boolean {
  const path = `${CACHE_DIR}/${namespace}.json`;
  return fs.existsSync(path);
}

export function clear() {
  fs.rmdirSync(CACHE_DIR, { recursive: true });
  createCacheDir();
}
