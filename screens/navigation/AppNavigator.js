import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../auth/SplashScreen';
import OnboardingScreen from '../auth/OnboardingScreen';
import LoginScreen from '../auth/LoginScreen';
import TermsScreen from '../auth/TermsScreen';
import NamesetScreen from '../auth/NamesetScreen';
import PreferSelectScreen from '../auth/PreferSelectScreen';
import PerferPlaceScreen from '../auth/PreferPlaceScreen';
import WelcomeScreen from '../auth/WelcomeScreen';
import SettingScreen from '../mypage/SettingScreen';
import InquiryScreen from '../mypage/InquiryScreen';
import AnnounceScreen from '../mypage/AnnounceScreen';
import TermsDetailScreen1 from '../common/TermsDetailScreen1';
import TermsDetailScreen2 from '../common/TermsDetailScreen2';
import TermsDetailScreen3 from '../common/TermsDetailScreen3';
import ShopDetailScreen from '../shop/ShopDetailScreen';
import MypageEditScreen from '../mypage/MypageEditScreen';

import NewsLetterStackNavigator from './NewsLetterStackNavigator';
import MainTabNavigator from './MainTabNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import KeywardStackNavigator from './KeywardStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Nameset" component={NamesetScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferSelect" component={PreferSelectScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferPlace" component={PerferPlaceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchStack" component={SearchStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="KeywardStack" component={KeywardStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NewsLetterStack" component={NewsLetterStackNavigator} options={{ headerShown: false }} />

      <Stack.Screen name="MypageEdit" component={MypageEditScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Inquiry" component={InquiryScreen} />
      <Stack.Screen name="Announce" component={AnnounceScreen}/>
      <Stack.Screen name="TermsDetail1" component={TermsDetailScreen1} />
      <Stack.Screen name="TermsDetail2" component={TermsDetailScreen2} />
      <Stack.Screen name="TermsDetail3" component={TermsDetailScreen3} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;