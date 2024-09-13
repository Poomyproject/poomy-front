import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import FavoritesScreen from '../FavoritesScreen';
import MainScreen from '../MainScreen';
import MypageStackNavigator from './MypageStackNavigator';
import colors from '../../config/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: '찜',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/ic_todo.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/ic_home.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageTab"
        component={MypageStackNavigator}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/ic_mypage.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;