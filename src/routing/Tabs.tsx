import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteList from '../components/favorite-list';
import MovieList from '../components/movie-list';
import {TabsParamList} from './TabsParamList';

const TabsNavigation = createBottomTabNavigator<TabsParamList>();

const Tabs = () => {
  return (
    <TabsNavigation.Navigator screenOptions={{headerShown: false}}>
      <TabsNavigation.Screen name="Search" component={MovieList} />
      <TabsNavigation.Screen name="Favorites" component={FavoriteList} />
    </TabsNavigation.Navigator>
  );
};

export default Tabs;