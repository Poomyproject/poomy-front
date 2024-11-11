import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LikeScreen from '../like/LikeScreen';
import MainScreen from '../main/MainScreen';
import MypageStackNavigator from './MypageStackNavigator';
import colors from '../../config/colors';
import ShopNavigatior from './ShopNavigatior';
import ShopProvider from '../shop/ShopContext';
import { fonts } from '../../config/fonts';
import { Text } from 'react-native-paper';
import LikeStackNavigator from './LikeStackNavigator';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="찜"
        component={LikeStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.Green900 : colors.Gray500 }}>찜</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={focused ? require('../../assets/ic_todo_active.png') : require('../../assets/ic_todo.png')}
              style={{ width: 20, height: 20, marginRight:2, }}
            />
          ),
          headerShown: false,
          headerTitleStyle: {
            ...fonts.Body1,
            color: colors.Gray900,
            fontSize:13
          },
        }}
      />
      <Tab.Screen
        name="Main"
        component={ShopNavigatior}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.Green900 : colors.Gray500, fontSize:13 }}>홈</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={focused ? require('../../assets/ic_home_active.png') : require('../../assets/ic_home.png')}
              style={{ width: 20, height: 20, marginRight:1 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.Green900 : colors.Gray500, fontSize:13 }}>마이페이지</Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={focused ? require('../../assets/ic_mypage_active.png') : require('../../assets/ic_mypage.png')}
              style={{ width: 20, height: 20, marginRight:2, }}
            />
          ),
          headerShown: false,
          headerTitleStyle: {
            ...fonts.Body1,
            color: colors.Gray900,
          },
        }}
      />
    </Tab.Navigator>
  );
};



export default MainTabNavigator;
