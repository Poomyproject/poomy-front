// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import TermsScreen from './screens/TermsScreen';
import NamesetScreen from './screens/NamesetScreen';
import PreferSelectScreen from './screens/PreferSelectScreen';
import PerferPlaceScreen from './screens/PreferPlaceScreen';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyPageScreen from './screens/MyPageScreen';
import SearchScreen from './screens/SearchScreen';

// 스택 네비게이터와 탭 네비게이터를 위한 생성
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          headerShown: false,
          tabBarLabel: '찜',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_todo.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }} 
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="MyPage" 
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_mypage.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

// SearchStackNavigator 설정
const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </SearchStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTab">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Nameset" component={NamesetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreferSelect" component={PreferSelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreferPlace" component={PerferPlaceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="SearchStack" component={SearchStackNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
