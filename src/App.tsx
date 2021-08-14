/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


import MovieList from './components/movie-list';
import MovieDetail from './components/movie-detail';
import { RootStackParamList } from './routing/RootStackParamList';
import TvShowDetail from './components/tvshow-detail';


const MainStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name="MovieSearch" component={MovieList} options={{
            title: "Search"
          }} />
          <MainStack.Screen name="MovieDetail" component={MovieDetail} />
          <MainStack.Screen name="TvShowDetail" component={TvShowDetail} />
        </MainStack.Navigator>
      </NavigationContainer>
  );
};

export default App;
