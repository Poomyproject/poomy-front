import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../SplashScreen';
import OnboardingScreen from '../OnboardingScreen';
import LoginScreen from '../LoginScreen';
import TermsScreen from '../TermsScreen';
import NamesetScreen from '../NamesetScreen';
import PreferSelectScreen from '../PreferSelectScreen';
import PerferPlaceScreen from '../PreferPlaceScreen';
import WelcomeScreen from '../WelcomeScreen';
import SettingScreen from '../SettingScreen';
import InquiryScreen from '../InquiryScreen';
import AnnounceScreen from '../AnnounceScreen';
import TermsDetailScreen1 from '../TermsDetailScreen1';
import TermsDetailScreen2 from '../TermsDetailScreen2';
import TermsDetailScreen3 from '../TermsDetailScreen3';
import ShopDetailScreen from '../ShopDetailScreen';
import MypageEditScreen from '../MypageEditScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import KeywardStackNavigator from './KeywardStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
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
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="KeywardStack" component={KeywardStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MypageEdit" component={MypageEditScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Setting" component={SettingScreen} options={{ headerTitle: '환경설정' }} />
      <Stack.Screen name="Inquiry" component={InquiryScreen} options={{ headerTitle: '문의사항' }} />
      <Stack.Screen name="Announce" component={AnnounceScreen} options={{ headerTitle: '공지사항' }} />
      <Stack.Screen name="TermsDetail1" component={TermsDetailScreen1} />
      <Stack.Screen name="TermsDetail2" component={TermsDetailScreen2} />
      <Stack.Screen name="TermsDetail3" component={TermsDetailScreen3} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;