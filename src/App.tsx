import React from 'react';

import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FavoriteContextProvider, {FavoriteContext} from './context/favorites';
import MainStack from './routing/MainStack';
import {TabsParamList} from './routing/TabsParamList';
import FavoritesStack from './routing/FavoritesStack';
import {Icon} from 'react-native-elements';

const Tabs = createBottomTabNavigator<TabsParamList>();

const screenOptions = (route: RouteProp<TabsParamList, keyof TabsParamList>, color: string) => {
  let iconName = '';

  switch (route.name) {
    case 'Favorites':
      iconName = 'favorite';
      break;
    case 'Media':
      iconName = 'subscriptions';
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const App = () => {

  return (
    <FavoriteContextProvider>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({route}) => {
            return {
              headerShown: false,
              tabBarIcon: ({color}) => screenOptions(route, color)
            };
          }}>
          <Tabs.Screen name="Media" component={MainStack} />
          <Tabs.Screen name="Favorites" component={FavoritesStack} />
        </Tabs.Navigator>
      </NavigationContainer>
    </FavoriteContextProvider>
  );
};

export default App;
