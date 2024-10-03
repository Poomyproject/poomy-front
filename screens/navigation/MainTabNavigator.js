import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LikeScreen from '../like/LikeScreen';
import MainScreen from '../MainScreen';
import MypageStackNavigator from './MypageStackNavigator';
import colors from '../../config/colors';
import ShopNavigatior from './ShopNavigatior';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarLabel: '찜',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/ic_todo.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Main"
        component={ShopNavigatior}
        options={{
        tabBarLabel: '홈',
        tabBarIcon: ({ color, size }) => (
        <Image source={require('../../assets/ic_home.png')} style={{ width: size, height: size, tintColor: color }} />
        ),
        headerShown: false,  // 헤더 없애기
        }}
      />

      <Tab.Screen
        name="마이페이지"
        component={MypageStackNavigator}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/ic_mypage.png')} style={{ width: size, height: size, tintColor: color }} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;