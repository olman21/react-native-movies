import Movie from './movie';
import Person from './Person';
import ReleaseDate from './release-date';

export default interface MovieDetail {
  id: number;
  backdrop_path: string;
  tagline: string;
  genres: {id: number; name: string}[];
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: string;
  credits: {
    cast: Person[];
  };
  recommendations: {
    results: Movie[];
  };
  release_dates: {
    results: ReleaseDate[];
  };
}
