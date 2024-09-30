import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ApiClient, { setAxiosInterceptors } from './screens/auth/ApiClient'; // 인터셉터 설정 함수와 ApiClient 임포트

const Initializer = () => {
  const navigation = useNavigation(); // navigation 객체 가져오기

  useEffect(() => {
    // 컴포넌트가 마운트될 때 인터셉터를 설정
    if (navigation) {
      setAxiosInterceptors(navigation); // navigation 객체 전달
    } else {
      console.error('Navigation object is not defined.');
    }
  }, [navigation]); // navigation 객체가 변경될 때마다 인터셉터 재설정

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default Initializer;

