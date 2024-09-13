import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../SearchScreen';

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </SearchStack.Navigator>
  );
};

export default SearchStackNavigator;
