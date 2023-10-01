export interface GoogleReview {
    author_name: string,
    author_url: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string,
    time: number
} 

export interface Review {
    time: number,
    relativeTimeDescription: string,
    profileImage?: string,
    rating: number,
    title?: string,
    text: string,
    authorName: string,
    details?: ReviewDetail[]
    source: "google" | "greetsiel-apartments"
}

export interface ReviewDetail {
    label: string,
    rating: number
}

export interface ReviewResponseType {
    result: Review[];
}

export interface GoogleReviewResponseType {
    result: {
        reviews: GoogleReview[]
    };
}

export interface Image {
    src: string,
    title: string
}