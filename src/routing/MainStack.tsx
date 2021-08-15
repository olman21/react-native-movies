import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList';
import MovieList from '../components/movie-list';
import MovieDetail from '../components/movie-detail';
import TvShowDetail from '../components/tvshow-detail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovieSearch"
        component={MovieList}
        options={{
          title: 'Search',
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="TvShowDetail" component={TvShowDetail} />
    </Stack.Navigator>
  );
};

export default MainStack;