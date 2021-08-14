import React from 'react';
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
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import ReleaseDate from '../models/release-date';
import CastCard from './cast-card';
import RecommendationCard from './recommendation-card';
import TvShowDetailModel from '../models/tvshow-detail';
import TvContentRating from '../models/tv-content-rating';
import SeasonCard from './season-card';

type tvShowDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TvShowDetail'
>;

type tvShowDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'TvShowDetail'
>;

type Props = {
  route: tvShowDetailScreenRouteProp;
  navigation: tvShowDetailScreenNavigationProp;
};

const loadtvShowDetail = async (tvShowId: number) => {
  const apiUrl = utilities.buildApiUrl(`tv/${tvShowId}`, {
    append_to_response: 'content_ratings,recommendations,credits',
  });
  try {
    const tvShowDetail = await axios.get<TvShowDetailModel>(apiUrl);
    return tvShowDetail.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUSCertifications = (contentRatings: TvContentRating[]) => {
  const usContentRatings = contentRatings.find(e => e.iso_3166_1 === 'US');
  return usContentRatings?.rating;
};

const tvShowDetail = ({navigation, route}: Props) => {
  const [tvShow, setTvShow] = useState<TvShowDetailModel>();

  useEffect(() => {
    (async function () {
      const tvShowDetail = await loadtvShowDetail(route.params.tvShowId);
      navigation.setOptions({
        title: tvShowDetail.name,
      });
      setTvShow(tvShowDetail);
    })();
  }, []);

  return (
    <ScrollView>
      {tvShow && (
        <View style={styles.mainContainer}>
          <View>
            <Image
              style={styles.backdropImage}
              source={{
                uri: utilities.buildMediaUrl(
                  tvShow.backdrop_path || tvShow.poster_path,
                  500,
                ),
              }}
            />
            <View style={styles.backdropFoot}>
              <Text style={styles.backdropTitle}>{tvShow.name}</Text>
              <View style={styles.backdropRating}>
                <Icon name="star" color="#E8ED07" />
                <Text style={styles.backdropRatingText}>
                  {tvShow.vote_average}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {tvShow.name} ({tvShow.first_air_date?.substring(0, 4)})
              </Text>
              <Text style={styles.certification}>
                {getUSCertifications(tvShow.content_ratings.results)}
              </Text>
            </View>

            <Text style={styles.genresLabel}>
              {tvShow.genres.map(g => g.name).join(', ')}
            </Text>

            <Text style={styles.subtitle}>Sipnosis</Text>

            <Text style={styles.overview}>{tvShow.overview}</Text>

            <Text style={styles.tagline}>{tvShow.tagline}</Text>

            <Text style={styles.subtitle}>Seasons</Text>

            <FlatList
              data={tvShow.seasons}
              renderItem={({item}) => <SeasonCard Season={item}></SeasonCard>}
              horizontal={true}></FlatList>

            <Text style={styles.subtitle}>Cast</Text>

            <FlatList
              data={tvShow.credits.cast.filter(c => !!c.profile_path)}
              renderItem={({item}) => <CastCard Person={item}></CastCard>}
              horizontal={true}></FlatList>

            <Text style={styles.subtitle}>Recommendations</Text>

            <FlatList
              data={tvShow.recommendations.results.filter(
                c => !!c.backdrop_path,
              )}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('TvShowDetail', {tvShowId: item.id})
                  }>
                  <RecommendationCard
                    ImagePath={item.backdrop_path}
                    Title={item.name}></RecommendationCard>
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
});

export default tvShowDetail;
