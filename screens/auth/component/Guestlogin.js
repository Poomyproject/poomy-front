import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ApiClient = axios.create({
  baseURL: 'http://54.180.202.93:8080',// API base URL , 'http://localhost:8080'
  timeout: 8000, // 요청 제한 시간 설정 (밀리초)
  headers: {
  },
});

// 게스트 상태 확인 함수
export const checkGuestStatus = async () => {
  try {
    const guestId = await AsyncStorage.getItem('guestId');
    console.log('checkGuestStatus - guestId:', guestId); // 로그 추가
    return guestId ? true : false;
  } catch (error) {
    console.error('Error checking guest status:', error);
    return false;
  }
};

export const handleGuestLogin = async (navigation) => {
  try {
    const guestId = `Guest${Math.floor(1000 + Math.random() * 9000)}`;
    console.log('Generated Guest ID:', guestId); // 로그 추가

    const response = await ApiClient.post('/api/users/login/guest', {
      guestId: guestId,
    });

    let accessToken = response.headers['accesstoken'] || response.data.accessToken;

    if (accessToken && accessToken.startsWith('Bearer ')) {
      accessToken = accessToken.substring(7); // "Bearer " 제거
    }

    if (accessToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('guestId', guestId); // guestId 저장
      console.log('Guest Login Successful:', accessToken);
      console.log('Guest ID Stored in AsyncStorage:', guestId); // 확인 로그

      navigation.replace('MainTab', { isGuest: true });
    } else {
      throw new Error('Failed to receive access token from server');
    }
  } catch (error) {
    console.error('Guest Login Error:', error);
    Alert.alert('Error', '게스트 로그인 실패. 다시 시도해 주세요.');
  }
};


// 게스트 로그아웃 처리 함수
export const handleGuestLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('guestId'); // AsyncStorage에서 게스트 ID 삭제
    console.log('Guest session cleared.');
    navigation.replace('LoginScreen'); // 로그인 화면으로 이동
  } catch (error) {
    console.error('Error during guest logout:', error);
    throw new Error('게스트 로그아웃에 실패했습니다.');
  }
};


