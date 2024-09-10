import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios 인스턴스 생성
const ApiClient = axios.create({
  baseURL: 'http://localhost:8080', // API base URL
  timeout: 3000, // 요청 제한 시간 설정 (밀리초)
  headers: {
   //'Content-Type': 'application/json', // JSON 전송
  },
});

ApiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 JWT 토큰 가져오기
      if (token) {
        console.log('Access Token:', token); // 토큰이 문자열인지 확인
        // Bearer <token> 형식으로 헤더에 토큰 추가
        config.headers.accessToken = `Bearer ${token}`; 
      } else {
        console.log('No access token found');
      }

      // 기본 Accept 헤더 제거
      delete config.headers['Accept'];

      // 로그로 요청 데이터와 헤더 출력
      console.log('Request Config:', config);
      console.log('Request Headers:', config.headers);
      console.log('Request Data:', config.data);

    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 오류 처리
  }
);


// 응답 인터셉터 설정 (에러 처리)
ApiClient.interceptors.response.use(
  (response) => {
    // 로그로 응답 데이터 출력
    console.log('Response:', response);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - 로그아웃 또는 재로그인 필요');
    }
    return Promise.reject(error); // 오류가 발생하면 에러 반환
  }
);

// 토큰을 AsyncStorage에 저장하는 함수
export const setAccessToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token); // accessToken을 AsyncStorage에 저장
    console.log('Access Token saved:', token);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

// ApiClient 인스턴스 export
export default ApiClient;
