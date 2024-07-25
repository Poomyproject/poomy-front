import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { API_BASE_URL, GOOGLE_IOS_CLIENT_ID } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';
import fonts from '../config/fonts'; 

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Axios 요청 인터셉터 설정
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log('API_BASE_URL:', API_BASE_URL);
console.log('GOOGLE_IOS_CLIENT_ID:', GOOGLE_IOS_CLIENT_ID);

const LoginScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      include_granted_scopes: false,
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
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services are not available');
      } else {
        console.log('Google sign-in error', error);
        Alert.alert('Error', 'Failed to sign in with Google');
      }
    }
  };

  const handlePostRequest = async (idToken) => {
    try {
      const url = `${API_BASE_URL}/api/users/login/google`;
      console.log('Sending POST request to:', url);
      console.log('Request body:', { idToken });

      const response = await axios.post(url, { idToken }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
      });

      console.log('Post response:', response.data);

      // 응답 헤더에서 accessToken 추출
      const accessToken = response.headers['accesstoken'];
      console.log('Access Token:', accessToken);

      if (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
        await setAuthHeader(); // Update the auth header for future requests
        return true;
      } else {
        console.error('Access Token is undefined');
        Alert.alert('Error', 'Access Token is undefined');
        return false;
      }
    } catch (error) {
      console.error('Error posting data:', error.message);
      console.error('Error details:', error.toJSON ? error.toJSON() : error);
      Alert.alert('Error', '로그인 실패');
      return false;
    }
  };

  const setAuthHeader = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
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
    alignSelf: 'center',
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
    fontFamily : 'Pretendard-Medium',
  },
});

export default LoginScreen;
