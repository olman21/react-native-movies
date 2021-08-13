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


const MainStack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name="movie-search" component={MovieList} options={{
            title: "Movies"
          }} />
        </MainStack.Navigator>
      </NavigationContainer>
  );
};

export default App;
