import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetail from '../components/movie-detail';
import TvShowDetail from '../components/tvshow-detail';
import { FavoritesParamList } from './FavoritesParamList';
import FavoriteList from '../components/favorite-list';

const Stack = createNativeStackNavigator<FavoritesParamList>();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteList"
        component={FavoriteList}
        options={{
          title: 'Favorites',
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="TvShowDetail" component={TvShowDetail} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;