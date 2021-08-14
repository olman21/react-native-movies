import Person from './Person';
import ReleaseDate from './release-date';
import Season from './season';
import TvContentRating from './tv-content-rating';
import TVShow from './tvshow';

export default interface TvShowDetail {
  id: number;
  backdrop_path: string;
  tagline: string;
  genres: {id: number; name: string}[];
  name: string;
  first_air_date: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  number_of_seasons: number;
  credits: {
    cast: Person[];
  };
  recommendations: {
    results: TVShow[];
  };
  content_ratings: {
    results: TvContentRating[];
  };
  seasons: Season[]
}
