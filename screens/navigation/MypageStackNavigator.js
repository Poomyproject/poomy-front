import React , {useEffect} from 'react';
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
import ApiClient from '../auth/ApiClient';
import UserProvider from '../mypage/UserContext';

const MypageStack = createStackNavigator();

const handleSaveNickname = async () => {
  try {
    const response = await ApiClient.post('/api/users/nickname', { nickname: nickname });
    if (response.data.success) {
      console.log('Nickname saved successfully');
      navigation.goBack(); // 저장 후 이전 화면으로 이동
    } else {
      console.error('Error saving nickname');
    }
  } catch (error) {
    console.error('Error during nickname save:', error);
  }
};


const MypageStackNavigator = ({ navigation, route }) => {

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     e.preventDefault();

  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'MyPage' }],
  //     });
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <UserProvider>
      <MypageStack.Navigator initialRouteName="MyPage">
        <MypageStack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false }}  // 시작 화면 설정
        />
        <MypageStack.Screen
          name="MypageEdit"
          component={MypageEditScreen}
          options={({ navigation, route }) => ({
            headerTitle: '마이페이지 수정',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                route.params?.handleSaveNicknameToServer();
              }}>
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
        <MypageStack.Screen
          name="NameEdit"
          component={NameEditScreen}
          options={({ navigation }) => ({
            headerTitle: '닉네임 수정',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={handleSaveNickname}>
                <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </MypageStack.Navigator>
    </UserProvider>
  );
};

export default MypageStackNavigator;
