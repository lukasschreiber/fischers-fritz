import { useEffect, useState } from "react";

interface Review {
    author_name: string,
    author_url: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string
} 

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/reviews", {
            method: "GET",
        }).then(body => body.json()).then(json => setReviews(json.result.reviews)).catch(console.log)
    }, [])
  return (<div>{reviews.map(review => (<div key={review.author_name}>{review.author_name}</div>))}</div>);
}
