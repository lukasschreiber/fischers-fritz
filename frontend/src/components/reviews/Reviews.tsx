import { useEffect, useState } from "react";
import { Review, ReviewResponseType, SortOption } from "../../types";
import { Stars } from "./Stars";
// import { ReviewGallery } from "./ReviewGallery";
import { ReviewGrid } from "./ReviewsGrid";

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [sort, setSort] = useState<SortOption>("rating_and_length_desc");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews?sort=${sort}`, {
            method: "GET",
        })
            .then((body) => body.json() as Promise<ReviewResponseType>)
            .then((json) => setReviews([...json.result]))
            .catch(console.log);
    }, [sort]);

    const mean = (reviews: Review[]) => {
        return Math.round((reviews.reduce((p, c) => p + c.rating, 0) / reviews.length) * 100) / 100;
    };

    return (
        <div className="reviews mt-3">
            <div className="text-sm flex gap-2 pt-2 flex-col sm:flex-row">
                <div>
                    <div className="flex gap-2 items-center text-neutral-600">
                        <Stars max={5} mean={mean(reviews)} /> {mean(reviews)}
                    </div>
                    <div className="text-neutral-400">{reviews.length} Bewertungen</div>
                </div>
                <div className="sm:ml-auto flex items-center gap-1">
                    <div className="text-neutral-400">Sortierung:</div>
                    <select className="outline-0" onChange={(e) => setSort(e.target.value as SortOption)}>
                        <option value="rating_and_length_desc">Beste zuerst</option>
                        <option value="date_desc">Neuste zuerst</option>
                        <option value="longest_first">Längste zuerst</option>
                        <option value="shortest_first">Kürzeste zuerst</option>
                    </select>
                </div>
            </div>

            {/* <div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating}>
            {rating}:{" "}
            {reviews.filter((review) => review.rating === rating).length}{" "}
            Reviews
          </div>
        ))}
      </div> */}
      <div className="text-sm text-gray-400 py-4">Wir zeigen hier alle Bewertungen aus unterschiedlichen vertrauenswürdigen Quellen an. Die Bewertungen werden nicht überprüft. Die jeweilige Gesamtbewertung kann sich je nach Quelle aus unterschiedlichen Einzelnoten zusammensetzen.</div>
            <ReviewGrid reviews={reviews} />
        </div>
    );
}
