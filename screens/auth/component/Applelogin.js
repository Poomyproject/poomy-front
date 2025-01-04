import React from 'react';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appleAuth from '@invertase/react-native-apple-authentication';

// Axios 인스턴스 생성
const ApiClient = axios.create({
  baseURL: 'http://localhost:8080', // API base URL
  timeout: 8000, // 요청 제한 시간 설정 (밀리초)
  headers: {},
});

// AsyncStorage에 Access Token 저장하는 함수
const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
    console.log('Access Token saved:', token);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

// 사용자 상태 확인 함수
// const checkUserInfoStatus = async (navigation) => {
//   try {
//     const response = await ApiClient.get('/api/users');
//     const { nickname, moods = [], spots = [] } = response.data.response;

//     if (!nickname) {
//       navigation.replace('Terms');
//     } else if (!moods || moods.length === 0) {
//       navigation.replace('PreferSelect');
//     } else if (!spots || spots.length === 0) {
//       navigation.replace('PreferPlace');
//     } else {
//       navigation.replace('MainTab');
//     }
//   } catch (error) {
//     // 서버에서 데이터 불러오기 실패 시 처리
//     console.error('Error fetching user info:', error);

//     if (error.response && error.response.status === 500) {
//       Alert.alert('Error', '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
//     } else if (error.response && error.response.status === 404) {
//       Alert.alert('Error', '사용자 데이터를 찾을 수 없습니다.');
//     } else {
//       Alert.alert('Error', '사용자 정보를 확인할 수 없습니다. 네트워크 상태를 확인하세요.');
//     }
//   }
// };

// 사용자 상태 확인 함수
const checkUserInfoStatus = async (navigation) => {
  try {
    // 사용자 데이터 가져오기
    const response = await ApiClient.get('/api/users');
    console.log('User info fetched:', response.data.response); // 디버깅용 로그 추가

    // 조건부 확인 없이 무조건 Terms 화면으로 이동
    navigation.replace('MainTab');
  } catch (error) {
    // 서버에서 데이터 불러오기 실패 시 처리
    // console.error('Error fetching user info:', error);

    // if (error.response && error.response.status === 500) {
    //   Alert.alert('Error', '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    // } else if (error.response && error.response.status === 404) {
    //   Alert.alert('Error', '사용자 데이터를 찾을 수 없습니다.');
    // } else {
    //   Alert.alert('Error', '사용자 정보를 확인할 수 없습니다. 네트워크 상태를 확인하세요.');
    // }

    // 에러 발생 시에도 Terms 화면으로 이동
    navigation.replace('MainTab');
  }
};



// Apple 로그인 처리
const handleSignInApple = async (navigation) => {
  try {
    // 1. Apple 로그인 요청
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const { identityToken, authorizationCode } = appleAuthRequestResponse;

    if (!identityToken) {
      throw new Error('Apple identity token is missing');
    }

    // 2. 서버로 identityToken과 authorizationCode 전송
    const response = await ApiClient.post('/api/users/login/apple', {
      idToken: identityToken,
      authorizationCode: authorizationCode,
    });

    // 3. Access Token 처리
    let accessToken = response.headers['accesstoken'] || response.data.accessToken;

    if (accessToken && accessToken.startsWith('Bearer ')) {
      accessToken = accessToken.substring(7);
    }

    if (accessToken) {
      await setAccessToken(accessToken);
      console.log('Apple Login Successful:', accessToken);

      // 사용자 정보 확인 및 화면 전환
      await checkUserInfoStatus(navigation);
    } else {
      throw new Error('Failed to receive access token from server');
    }
  } catch (error) {
    if (error.message === 'User registration required') {
      await registerNewUser(navigation, identityToken, authorizationCode);
    } else {
      console.error("Apple Login Error:", error.message);
      Alert.alert('Error', 'Apple 로그인 실패. 다시 시도해 주세요.');
    }
  }
};

// 회원가입 처리
const registerNewUser = async (navigation, identityToken, authorizationCode) => {
  try {
    const response = await ApiClient.post('/api/users/register/apple', {
      idToken: identityToken,
      authorizationCode: authorizationCode,
    });

    let accessToken = response.headers['accesstoken'] || response.data.accessToken;

    if (accessToken && accessToken.startsWith('Bearer ')) {
      accessToken = accessToken.substring(7);
    }

    if (accessToken) {
      await setAccessToken(accessToken);
      //console.log('Apple Registration Successful:', accessToken);

      // 사용자 정보 확인 및 화면 전환
      await checkUserInfoStatus(navigation);
    } else {
      throw new Error('Failed to receive access token during registration');
    }
  } catch (error) {
    console.error('Registration Error:', error.message);
    Alert.alert('Error', '회원가입 실패. 다시 시도해 주세요.');
  }
};

// Apple 로그인 버튼 컴포넌트
const AppleLogin = () => {
  const navigation = useNavigation();

  const onAppleSignInPress = async () => {
    await handleSignInApple(navigation);
  };

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 350,
        height: 48,
        marginTop: 15,
      }}
      onPress={onAppleSignInPress} // Apple 로그인 함수 호출
    />
  );
};

export default AppleLogin;
