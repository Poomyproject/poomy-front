import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Text } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import ReportModal from './modal/ReportModal';
import { useNavigation } from '@react-navigation/native';


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
import NameEditScreen from '../mypage/NameEditScreen';
import KeywordList from '../search/KeywordList';

import UserReviewScreen1 from '../review/UserReviewScreen1';
import UserReviewScreen2 from '../review/UserReviewScreen2';
import UserReviewScreen3 from '../review/UserReviewScreen3';
import UserReviewScreen4 from '../review/UserReviewScreen4';
import ShopReviewScreen from '../shop/ShopReviewScreen';
import ReviewPictureScreen from '../review/ReviewPictureScreen';
import OneReviewScreen from '../review/OneReviewScreen';


import NewsLetterStackNavigator from './NewsLetterStackNavigator';
import MainTabNavigator from './MainTabNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import KeywordStackNavigator from './KeywordStackNavigator';
import ReviewStackNavigator from './ReviewStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null); 
  const navigation = useNavigation(); // navigation 객체 가져오기

  return (
    <>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Nameset" component={NamesetScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferSelect" component={PreferSelectScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferPlace" component={PerferPlaceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MypageEdit" component={MypageEditScreen} options={{ headerShown: true }} />
      <Stack.Screen name='ReviewPictures' component={ReviewPictureScreen} options={({ navigation }) => ({
          headerTitle: '리뷰',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
      <Stack.Screen name="NameEdit" component={NameEditScreen} options={({ navigation }) => ({
          headerTitle: '닉네임 변경하기',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSaveNickname}>
              <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
            </TouchableOpacity>
          ),
        })} />

      <Stack.Screen name="Setting" component={SettingScreen} options={({ navigation }) => ({
          headerTitle: '환경설정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
      <Stack.Screen name="Inquiry" component={InquiryScreen}options={({ navigation }) => ({
          headerTitle: '문의사항',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
      <Stack.Screen name="Announce" component={AnnounceScreen}options={({ navigation }) => ({
          headerTitle: '공지사항',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
      <Stack.Screen name="TermsDetail1" component={TermsDetailScreen1} options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),})} />
      <Stack.Screen name="TermsDetail2" component={TermsDetailScreen2} options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
      <Stack.Screen name="TermsDetail3" component={TermsDetailScreen3} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />

        <Stack.Screen name="ShopReview" component={ShopReviewScreen} options={({ navigation }) => ({
          headerTitle: '리뷰',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.Ivory100 },
          headerTintColor: colors.Gray900,
          ...fonts.Body1
         })}/>

        <Stack.Screen 
          name="ReviewStack" 
          component={ReviewStackNavigator} 
          options={{ headerShown: false }} 
        />

<Stack.Screen
            name="OneReview"
            component={OneReviewScreen}
            options={({ route }) => ({
              headerTitle: '리뷰 상세',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentReviewId(route.params?.reviewId || null); // reviewId 가져오기
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={require('../../assets/ic_more.png')}
                    style={{ marginRight: 10, height: 24, width: 24 }}
                  />
                </TouchableOpacity>
              ),
              headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.Ivory100 },
          headerTintColor: colors.Gray900,
          ...fonts.Body1
            })}
          />

      <Stack.Screen name="KeywordStack" component={KeywordStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NewsLetterStack" component={NewsLetterStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchStack" component={SearchStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Keyword" component={KeywordList} options={{ headerShown: false }} />
    </Stack.Navigator>

    <ReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reviewId={currentReviewId} // 모달에 reviewId 전달
      />

    </>
  );
};

export default AppNavigator;