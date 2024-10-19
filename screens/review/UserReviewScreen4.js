import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native'; // 네비게이션을 사용하기 위함
import UserReviewScreen3 from './UserReviewScreen3';
import { fonts } from '../../config/fonts';

const UserReviewScreen4= () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 성공 이미지 */}
      <Image source={require('../../assets/img_fin_review.png')} style={styles.image} />

      {/* 메시지 */}
      <Text style={styles.message}>리뷰 등록이 완료 되었어요</Text>

      {/* 버튼 */}
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('UserReviewListScreen')} // 작성한 리뷰 보기 페이지로 이동
      >
        <Text style={styles.buttonText}>작성한 리뷰 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Ivory100,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  message: {
    fontSize: 18,
    color: colors.Gray900,
    marginBottom: 30,
    ...fonts.Body2,
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.Green900,
    marginTop : 280 , 
  },
  buttonText: {
    fontSize: 16,
    color: colors.Ivory100,
    ...fonts.Body2,
  },
});

export default UserReviewScreen4;
