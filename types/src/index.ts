export interface Review {
    author_name: string,
    author_url: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string
} 

export interface ReviewResponseType {
    result: Review[];
}

export interface GoogleReviewResponseType {
    result: {
        reviews: Review[]
    };
}

export interface Image {
    src: string,
    title: string
}