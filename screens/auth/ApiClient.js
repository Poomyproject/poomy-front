import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios 인스턴스 생성
const ApiClient = axios.create({
  baseURL: 'http://localhost:8080', // API base URL
  timeout: 3000, // 요청 제한 시간 설정 (밀리초)
  headers: {
  },
});

ApiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 JWT 토큰 가져오기
      if (token) {
        //console.log('Access Token:', token); 
        config.headers.accessToken = `Bearer ${token}`; 
      } else {
        console.log('No access token found');
      }

      // 기본 Accept 헤더 제거
      delete config.headers['Accept'];

      // 로그로 요청 데이터와 헤더 출력
      // console.log('Request Config:', config);
      // console.log('Request Headers:', config.headers);
      // console.log('Request Data:', config.data);

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
export const setAxiosInterceptors = (navigation) => {
  ApiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;

      if (status === 401 || status === 500) {
        console.error(`${status} Error - 로그아웃 또는 재로그인 필요`);

        // 엑세스 토큰 삭제
        await AsyncStorage.removeItem('accessToken');
        console.log('Access Token removed. Redirecting to Splash.');

        // 401 또는 500 에러 발생 시 Splash 화면으로 이동
        if (navigation && typeof navigation.replace === 'function') {
          navigation.navigate('Splash');  // 로그아웃 처리
        } else {
          console.error('Navigation object is not properly defined.');
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
