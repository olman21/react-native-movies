import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routing/RootStackParamList';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import {useState} from 'react';
import utilities from '../utilities';
import MovieDetailModel, {MovieDetailToMedia} from '../models/movie-detail';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import ReleaseDate from '../models/release-date';
import CastCard from './cast-card';
import RecommendationCard from './recommendation-card';
import {FavoriteContext} from '../context/favorites';
import MediaType from '../models/media-type';
import FavoriteButton from './favorite-button';

type MovieDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieDetail'
>;

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

type Props = {
  route: MovieDetailScreenRouteProp;
  navigation: MovieDetailScreenNavigationProp;
};

const loadMovieDetail = async (movieId: number) => {
  const apiUrl = utilities.buildApiUrl(`movie/${movieId}`, {
    append_to_response: 'release_dates,recommendations,credits',
  });
  try {
    const movieDetail = await axios.get<MovieDetailModel>(apiUrl);
    return movieDetail.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUSCertOutOfReleaseDates = (releaseDates: ReleaseDate[]) => {
  const usReleaseDates = releaseDates.find(e => e.iso_3166_1 === 'US');
  const firstCertification = usReleaseDates?.release_dates[0]?.certification;

  return firstCertification;
};





const MovieDetail = ({navigation, route}: Props) => {
  const [movie, setMovie] = useState<MovieDetailModel>();

  useEffect(() => {
    (async function () {
      const movieDetail = await loadMovieDetail(route.params.movieId);
      navigation.setOptions({
        title: movieDetail.title,
        headerRight: () => (
          <FavoriteButton Media={MovieDetailToMedia(movieDetail)} />
        ),
      });
      setMovie(movieDetail);
    })();
  }, []);

  return (
    <ScrollView>
      {movie && (
        <View style={styles.mainContainer}>
          <View>
            <Image
              style={styles.backdropImage}
              source={{
                uri: utilities.buildMediaUrl(
                  movie.backdrop_path || movie.poster_path,
                  500,
                ),
              }}
            />
            <View style={styles.backdropFoot}>
              <Text style={styles.backdropTitle}>{movie.title}</Text>
              <View style={styles.backdropRating}>
                <Icon name="star" color="#E8ED07" />
                <Text style={styles.backdropRatingText}>
                  {movie.vote_average}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {movie.title} ({movie.release_date?.substring(0, 4)})
              </Text>
              <Text style={styles.certification}>
                {getUSCertOutOfReleaseDates(movie.release_dates.results)}
              </Text>
            </View>

            <Text style={styles.genresLabel}>
              {movie.genres.map(g => g.name).join(', ')}
            </Text>

            <Text style={styles.subtitle}>Sipnosis</Text>

            <Text style={styles.overview}>{movie.overview}</Text>

            <Text style={styles.tagline}>{movie.tagline}</Text>

            <Text style={styles.subtitle}>Cast</Text>

            <FlatList
              data={movie.credits.cast.filter(c => !!c.profile_path)}
              renderItem={({item}) => <CastCard Person={item}></CastCard>}
              horizontal={true}></FlatList>

            <Text style={styles.subtitle}>Recommendations</Text>

            <FlatList
              data={movie.recommendations.results.filter(
                c => !!c.backdrop_path,
              )}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('MovieDetail', {movieId: item.id})
                  }>
                  <RecommendationCard
                    ImagePath={item.backdrop_path}
                    Title={item.title}></RecommendationCard>
                </TouchableOpacity>
              )}
              horizontal={true}></FlatList>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 50,
  },
  backdropImage: {
    width: '100%',
    height: 220,
  },
  backdropFoot: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 45,
    padding: 10,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  backdropTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    maxWidth: '85%',
  },
  backdropRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backdropRatingText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#302E2E',
  },
  certification: {
    borderColor: '#5B5656',
    borderWidth: 1,
    fontFamily: 'Roboto-Regular',
    color: '#5B5656',
    padding: 3,
    marginLeft: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingTop: 18,
  },
  genresLabel: {
    color: '#5B5656',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  bodyContainer: {
    paddingHorizontal: 16,
  },
  subtitle: {
    color: '#302E2E',
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    marginVertical: 15,
  },
  overview: {
    color: '#5B5656',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
  },
  tagline: {
    fontFamily: 'Roboto-Light',
    color: '#6D6D6D',
    fontSize: 15,
    marginVertical: 5,
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    padding: 10,
  },
});

export default MovieDetail;
