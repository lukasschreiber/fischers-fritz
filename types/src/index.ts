export interface Review {
    author_name: string,
    author_url: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string
} 

export interface ReviewRequestType {
    result: Review[];
}