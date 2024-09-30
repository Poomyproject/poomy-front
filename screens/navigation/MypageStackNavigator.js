import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Text } from 'react-native';
import MyPageScreen from '../mypage/MyPageScreen';
import MypageEditScreen from '../mypage/MypageEditScreen';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import SettingScreen from '../mypage/SettingScreen';
import InquiryScreen from '../mypage/InquiryScreen';
import AnnounceScreen from '../mypage/AnnounceScreen';

const MypageStack = createStackNavigator();

const MypageStackNavigator = () => {
  return (
    <MypageStack.Navigator>
      <MypageStack.Screen name="MyPage" component={MyPageScreen} options={{ headerShown: false }} />
      <MypageStack.Screen
        name="MypageEdit"
        component={MypageEditScreen}
        options={({ navigation }) => ({
          headerTitle: '마이페이지 수정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <MypageStack.Screen
        name="Setting"
        component={SettingScreen}
        options={({ navigation }) => ({
          headerTitle: '환경설정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <MypageStack.Screen
        name="Inquiry"
        component={InquiryScreen}
        options={({ navigation }) => ({
          headerTitle: '문의사항',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
        })}
      />
       <MypageStack.Screen
        name="Announce"
        component={AnnounceScreen}
        options={({ navigation }) => ({
          headerTitle: '공지사항',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </MypageStack.Navigator>
  );
};

export default MypageStackNavigator;