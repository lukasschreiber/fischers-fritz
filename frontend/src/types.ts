export interface GoogleReview {
    author_name: string;
    author_url: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface Keyword {
    n: number;
    text: string;
    bounds: [number, number];
}

export type ReviewSource = "google" | "greetsiel-apartments" | "fewo-direct" | "traum-ferienwohnungen";

export interface Review {
    time: number;
    relativeTimeDescription: string;
    profileImage?: string;
    rating: number;
    title?: string;
    text: string;
    authorName: string;
    details?: ReviewDetail[];
    keywords: Keyword[];
    source: ReviewSource;
}

export interface ReviewDetail {
    label: string;
    rating: number;
}

export type SortOption = "rating_and_length_desc" | "date_desc" | "longest_first" | "shortest_first";

export interface ReviewRequest {
    sort: SortOption;
}

export interface ReviewResponseType {
    result: Review[];
}

export interface GoogleReviewResponseType {
    result: {
        reviews: GoogleReview[];
    };
}

export interface Image {
    src: string;
    title: string;
}
