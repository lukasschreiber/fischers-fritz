import { useEffect, useState } from "react";
import { Review } from "@fischers-fritz/types";

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/reviews", {
            method: "GET",
        }).then(body => body.json()).then(json => setReviews(json.result.reviews)).catch(console.log)
    }, [])
  return (<div>{reviews.map(review => (<div key={review.author_name}>{review.author_name}</div>))}</div>);
}
