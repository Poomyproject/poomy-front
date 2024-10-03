import React from 'react';
import { View, Button, Alert } from 'react-native';
import { shareCustomTemplate } from '@react-native-seoul/kakao-login';

const KakaoShareButton = () => {

  const shareOnKakao = async () => {
    try {
      // 공유할 템플릿 설정
      const params = {
        templateId: 112305, // 카카오 개발자 콘솔에서 발급받은 템플릿 ID
        templateArgs: {
          key1: 'value1',  // 필요한 경우 템플릿 내에서 동적으로 사용될 변수 설정
          key2: 'value2'
        },
        useWebBrowserIfKakaoTalkNotAvailable: true,  // 카카오톡이 없을 때 웹 브라우저로 공유 허용
      };

      // 템플릿 공유 실행
      const result = await shareCustomTemplate(params);
      console.log('Kakao Share Success:', result);
      Alert.alert('공유 완료', '카카오톡으로 공유되었습니다.');
      
    } catch (error) {
      console.error('Kakao Share Failed:', error);
      Alert.alert('공유 실패', '카카오톡 공유에 실패했습니다.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="카카오톡으로 공유하기"
        onPress={shareOnKakao}
      />
    </View>
  );
};

export default KakaoShareButton;
