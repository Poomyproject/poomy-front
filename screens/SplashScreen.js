
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      // 로그인 상태 확인
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        navigation.replace('MainTab', { screen: 'Main' }); // 로그인된 사용자는 메인 화면으로 이동
      } else {
        navigation.replace('Onboarding'); // 로그인되지 않은 사용자는 온보딩 화면으로 이동
      }
    };

    // 3초 후에 로그인 상태를 확인하여 화면을 전환합니다
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 3000);

    // 클린업 함수에서 타이머를 정리합니다
    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Ivory100,
  },
  image: {
    width: 168,
    height: 184,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

