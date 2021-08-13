import Movie from "./movie";

export default interface MovieSearchResult {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}