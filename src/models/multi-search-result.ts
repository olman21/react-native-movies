import Movie from "./movie";
import Person from "./Person";
import TVShow from "./tvshow";

export default interface MultiSearchResult {
    page: number;
    results: Media[];
    total_results: number;
    total_pages: number;
}

export type Media = Movie|TVShow|Person;