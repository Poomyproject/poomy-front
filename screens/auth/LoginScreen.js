import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_IOS_CLIENT_ID } from '@env';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient, { setAccessToken } from './ApiClient'; // ApiClient와 setAccessToken 가져오기
import AppleLogin from './component/Applelogin';
import { handleGuestLogin } from './component/Guestlogin';


const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      offlineAccess: false,
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);

      const postResponse = await handlePostRequest(userInfo.idToken);
      if (postResponse) {
        await checkUserInfoStatus(); // 사용자 정보 확인 후 적절한 화면으로 이동
      }
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleSignInError = (error) => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled Google sign-in');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google sign-in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Error', '로그인 할 수 없습니다. 네트워크 상태를 확인해 주세요.');
    } else {
      console.log('Google sign-in error:', error.message);
      Alert.alert('Error', '로그인 할 수 없습니다. 네트워크 상태를 확인해 주세요.');
    }
  };

  const handlePostRequest = async (idToken) => {
    try {
      const url = `/api/users/login/google`;
      const response = await ApiClient.post(url, { idToken });
      let accessToken = response.headers['accesstoken'] || response.data.accessToken;

      if (accessToken && accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.substring(7);
      }

      if (accessToken) {
        await setAccessToken(accessToken); // accessToken 저장
        return true;
      } else {
        throw new Error('Failed to receive access token from server');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.status, error.response.data);
      } else {
        console.error('Error posting data:', error.message);
      }
      Alert.alert('Error', '로그인 실패');
      return false;
    }
  };

  const checkUserInfoStatus = async () => {
    try {
      const response = await ApiClient.get('/api/users');
      const { nickname, moods, spots } = response.data.response;

      if (!nickname) {
        navigation.replace('Terms');
      } else if (!moods || moods.length === 0) {
        navigation.replace('PreferSelect');
      } else if (!spots || spots.length === 0) {
        navigation.replace('PreferPlace');
      } else {
        navigation.replace('MainTab');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', '사용자 정보를 확인할 수 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo2.png')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
        <Image source={require('../../assets/icon_google.png')} style={styles.googleIcon} />
        <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
      </TouchableOpacity>
      <AppleLogin />
      <Text style={styles.guest} onPress={() => handleGuestLogin(navigation)}>
        로그인 없이 둘러보기
      </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Green900,
  },
  image: {
    width: 168,
    height: 184,
    resizeMode: 'contain',
  },
  button: {
    width: 350,
    height: 48,
    backgroundColor: colors.Ivory100,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: colors.Gray900,
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
  },
  guest : {
    color:colors.Ivory100,
    marginTop : 15, 
    ...fonts.Caption1,
  },
});

export default LoginScreen;
