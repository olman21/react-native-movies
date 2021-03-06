import MediaType from "./media-type";

export default interface Movie{
    id: number;
    poster_path: string;
    overview: string;
    release_date: string;
    original_title: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    media_type: MediaType;
}

