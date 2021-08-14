import React, {useState} from 'react';
import SearchComponent from './search';
import axios from 'axios';

import utilities from '../utilities';
import MovieSearchResult, {Media} from '../models/multi-search-result';
import {FlatList, TouchableOpacity} from 'react-native';
import MovieItem from './movie-item';
import {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routing/RootStackParamList';
import MediaType from '../models/media-type';

const searchMovies = async (text: string) => {
  const apiUrl = utilities.buildApiUrl('search/multi', {
    query: encodeURI(text),
  });
  try {
    const movies = await axios.get<MovieSearchResult>(apiUrl);
    return movies.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadPopular = async () => {
  const apiUrl = utilities.buildApiUrl('movie/popular');
  try {
    const movies = await axios.get<MovieSearchResult>(apiUrl);
    movies.data.results.forEach(r => (r.media_type = MediaType.Movie));
    return movies.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type MovieScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieSearch'
>;

type Props = {
  navigation: MovieScreenNavigationProp;
};

const MovieList = ({navigation}: Props) => {
  const [moviesResult, setMoviesResult] = useState<MovieSearchResult>();

  const navigateToDetailt = (media: Media) => {
    switch (media.media_type) {
      case MediaType.Movie:
        navigation.navigate('MovieDetail', {movieId: media.id});
        break;
      case MediaType.Tv:
        navigation.navigate('TvShowDetail', {tvShowId: media.id});
        break;
    }
  };

  useEffect(() => {
    (async function () {
      const popular = await loadPopular();
      setMoviesResult(popular);
    })();
  }, []);

  return (
    <>
      <SearchComponent
        onSearch={text => {
          (async function () {
            const searched = await searchMovies(text);
            setMoviesResult(searched);
          })();
        }}
        onClear={async () => {
          const popular = await loadPopular();
          setMoviesResult(popular);
        }}
      />
      <FlatList
        data={moviesResult?.results}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDetailt(item)}>
            <MovieItem Media={item}></MovieItem>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}></FlatList>
    </>
  );
};

export default MovieList;
