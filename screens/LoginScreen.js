import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_IOS_CLIENT_ID } from '@env';
import colors from '../config/colors';
import fonts from '../config/fonts';
import ApiClient, { setAccessToken } from './ApiClient'; // ApiClient와 setAccessToken 가져오기

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
      console.log(userInfo);

      const postResponse = await handlePostRequest(userInfo.idToken);
      if (postResponse) {
        navigation.replace('Terms');
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
      Alert.alert('Error', 'Google Play Services are not available');
    } else {
      console.log('Google sign-in error:', error.message);
      Alert.alert('Error', 'Failed to sign in with Google');
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

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
        <Image source={require('../assets/icon_google.png')} style={styles.googleIcon} />
        <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
      </TouchableOpacity>
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
});

export default LoginScreen;
