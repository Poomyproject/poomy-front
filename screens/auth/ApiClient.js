import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'; // Alert 추가
import { API_BASE_URL } from '@env'; // API_BASE_URL 가져오기
import appleAuth from '@invertase/react-native-apple-authentication';



// Axios 인스턴스 생성
const ApiClient = axios.create({
  baseURL: 'http://54.180.202.93:8080',// API base URL , 'http://localhost:8080' , 'http://54.180.202.93:8080'
  timeout: 8000, // 요청 제한 시간 설정 (밀리초)
  headers: {
  },
});


ApiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 JWT 토큰 가져오기
      //console.log(token)
      if (token) {
        //console.log('Access Token:', token); 
        config.headers.accessToken = `Bearer ${token}`; 
      } else {
        //console.log('No access token found');
      }

      // 기본 Accept 헤더 제거
      delete config.headers['Accept'];

      // 로그로 요청 데이터와 헤더 출력
      // console.log('Request Config:', config);
      // console.log('Request Headers:', config.headers);
      // console.log('Request Data:', config.data);

    } catch (error) {
      //console.error('Error fetching token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 오류 처리
  }
);


export const setAxiosInterceptors = (navigation) => {
  ApiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;

      if (status === 401 || status === 500) {
        try {
          // 게스트 로그인 여부 확인
          const isGuest = await AsyncStorage.getItem('isGuest');

          if (isGuest === 'true') {
            // 게스트 로그인이면 로그아웃 처리하지 않고 바로 반환
            return Promise.reject(error);
          }

          // 엑세스 토큰 삭제
          await AsyncStorage.removeItem('accessToken');

          // 로그아웃 알림을 사용자에게 표시 (활성화 X)
          // Alert.alert(
          //   "로그아웃 되었습니다",
          //   "다시 로그인해 주세요",
          //   [{ text: "확인" }] // 확인 버튼만 있는 간단한 알림
          // );

          // 401 또는 500 에러 발생 시 Splash 화면으로 이동
          if (navigation && typeof navigation.replace === 'function') {
            navigation.navigate('Splash'); // 로그아웃 처리
          } else {
            console.error('Navigation object is not properly defined.');
          }
        } catch (err) {
          console.error('Error handling interceptor logic:', err);
        }
      }
      return Promise.reject(error); // 오류가 발생하면 에러 반환
    }
  );
};


 
// 토큰을 AsyncStorage에 저장하는 함수
export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token); // accessToken을 AsyncStorage에 저장
    //console.log('Access Token saved:', token);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};


export default ApiClient;
