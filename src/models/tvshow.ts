import MediaType from "./media-type";

export default interface TVShow {
    id: number;
    poster_path: string;
    overview: string;
    first_air_date: string;
    original_name: string;
    name: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    media_type: MediaType;
}