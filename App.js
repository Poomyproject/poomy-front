import 'react-native-gesture-handler';
import React from 'react';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Nameset" component={NamesetScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PreferSelect" component={PreferSelectScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PreferPlace" component={PerferPlaceScreen}options={{ headerShown: false }}/>
        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};
