import { Review } from "@fischers-fritz/types";
import {spawn} from "child_process";

interface Keyword {
    n: number,
    text: string,
    bounds: [number, number]
}

export function getKeywords(review: Review): Promise<Keyword[]> {
    return new Promise<Keyword[]>((resolve, reject) => {
        const python = spawn("python", ["./keyword_interface.py", review.text]);
        python.stdout.on("data", (data) => {
            console.log(data);
            resolve([]);
        })
    })
}