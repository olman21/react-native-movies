import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FavoriteContext} from '../context/favorites';
import MovieItem from './movie-item';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabsParamList} from '../routing/TabsParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FavoritesParamList} from '../routing/FavoritesParamList';
import {Media} from '../models/multi-search-result';
import MediaType from '../models/media-type';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  FavoritesParamList,
  'FavoriteList'
>;

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const FavoriteList = ({navigation}: Props) => {
  const {removeFavorite, favorites} = useContext(FavoriteContext);

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

  return (
    <View style={styles.mainContainer}>
      {favorites && favorites.length ? (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigateToDetailt(item)}>
              <MovieItem Media={item}></MovieItem>
            </TouchableOpacity>
          )}></FlatList>
      ) : (
        <View style={styles.noFavContainer}>
          <Text style={styles.noFavLabel}>No Favorites!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
    width: '100%',
    height: '100%'},
  noFavLabel: {
    color: '#666666',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  noFavContainer: {
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 2,
    flexDirection: 'row',
  },
});

export default FavoriteList;
