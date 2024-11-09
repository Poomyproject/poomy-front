import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Text } from 'react-native';
import MyPageScreen from '../mypage/MyPageScreen';
import MypageEditScreen from '../mypage/MypageEditScreen';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import SettingScreen from '../mypage/SettingScreen';
import InquiryScreen from '../mypage/InquiryScreen';
import AnnounceScreen from '../mypage/AnnounceScreen';
import NameEditScreen from '../mypage/NameEditScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 로컬 스토리지 사용
import ApiClient from '../auth/ApiClient';
import { handleSave } from '../mypage/SaveFunction';


const MypageStack = createStackNavigator();

// 닉네임 저장 함수: 서버 저장 후 로컬 스토리지에 저장
const handleSaveNickname = async (nickname, navigation) => {
  try {
    const response = await ApiClient.post('/api/users/nickname', { nickname });
    if (response.data.success) {
      console.log('Nickname saved successfully');
      
      // 닉네임을 로컬 스토리지에 저장
      await AsyncStorage.setItem('nickname', nickname);

      // 저장 후 마이페이지로 이동
      navigation.goBack();
    } else {
      console.error('Error saving nickname');
    }
  } catch (error) {
    console.error('Error during nickname save:', error);
  }
};

const MypageStackNavigator = ({ navigation, route }) => {
  return (
    
      <MypageStack.Navigator initialRouteName="MyPage">
        <MypageStack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false }} // 시작 화면 설정
        />

        <MypageStack.Screen
          name="MypageEdit"
          component={MypageEditScreen}
          options={({ navigation, route }) => ({
            headerShown : false,
            headerTitle: '마이페이지 수정',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/left.png')} style={{ marginLeft : 10,height: 24, width: 24 }} />
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
          name="NameEdit"
          component={NameEditScreen}
          options={({ navigation }) => ({
            headerTitle: '닉네임 수정',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/left.png')} style={{ marginLeft : 10, height: 24, width: 24 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </MypageStack.Navigator>
  );
};

export default MypageStackNavigator;
