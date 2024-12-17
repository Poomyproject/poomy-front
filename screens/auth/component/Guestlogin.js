import AsyncStorage from '@react-native-async-storage/async-storage';

// 게스트 상태 확인 함수
export const checkGuestStatus = async () => {
  try {
    const guestId = await AsyncStorage.getItem('guestId'); // AsyncStorage에서 게스트 ID 가져오기
    return guestId ? true : false; // 게스트 ID가 있으면 true 반환
  } catch (error) {
    console.error('Error checking guest status:', error);
    return false; // 에러 발생 시 false 반환
  }
};

// 게스트 로그인 처리 함수
export const handleGuestLogin = async (navigation) => {
  try {
    const guestId = `Guest${Math.floor(1000 + Math.random() * 9000)}`; // Guest ID 생성
    await AsyncStorage.setItem('guestId', guestId); // AsyncStorage에 저장
    console.log('Guest Login Successful:', guestId);
    navigation.replace('MainTab', { isGuest: true }); // 게스트로 메인 화면 이동
  } catch (error) {
    console.error('Error during guest login:', error);
    throw new Error('게스트 로그인에 실패했습니다.');
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
