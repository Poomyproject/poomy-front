import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';


const UserReviewScreen2 = () => {
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 이미지를 관리하는 상태
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedShopId } = route.params;
  const { shopName } = route.params;
  // console.log('상점아이디',selectedShopId)

  // 버튼 활성화 여부
  const isButtonDisabled = selectedOption === null;

  // 선택된 옵션 처리
  const handleSelectOption = (option) => {
    if (selectedOption === option) {
      // 동일한 이미지를 다시 누르면 비활성화 (선택 해제)
      setSelectedOption(null);
    } else {
      // 다른 이미지를 선택하면 그 이미지를 활성화
      setSelectedOption(option);
    }
  };

  // 선택된 옵션을 AsyncStorage에 저장
  const handleSavePreference = async () => {
    try {
      const isRecommend = selectedOption === 'good'; // 'good'이면 true, 아니면 false
      await AsyncStorage.setItem('isRecommend', JSON.stringify(isRecommend)); // Boolean 값을 저장
      console.log('유저 선호도 저장 완료:', isRecommend);

      // 다음 화면으로 이동
      navigation.navigate('UserReview3',{ selectedShopId });
    } catch (error) {
      console.error('선호도 저장 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={styles.highlight}>{shopName || '상점 이름 없음'}</Text>
        의 {'\n'}특징을 알려주세요
      </Text>
      <Text style={styles.subHeader}>자유롭게 선택해주세요.</Text>

      {/* 선택 이미지들 */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleSelectOption('good')}>
          <Image
            source={
              selectedOption === 'good'
                ? require('../../assets/bt_review_good_active.png')
                : require('../../assets/bt_review_good.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelectOption('bad')}>
          <Image
            source={
              selectedOption === 'bad'
                ? require('../../assets/bt_review_bad_active.png')
                : require('../../assets/bt_review_bad.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      {/* 버튼 */}
      <TouchableOpacity
        style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isButtonDisabled}
        onPress={handleSavePreference} // AsyncStorage에 선호도 저장 후 다음 페이지로 이동
      >
        <Text style={[styles.buttonText, isButtonDisabled ? styles.buttonTextInactive : styles.buttonTextActive]}>
          다음으로
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Ivory100,
  },
  highlight: {
    color: colors.Green900,
    ...fonts.Title2,
  },
  header: {
    ...fonts.Title2,
    marginTop: 40,
    marginBottom: 10,
  },
  subHeader: {
    ...fonts.Body2,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: 167,
    height: 167,
  },
  button: {
    width: 350,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop : 250 ,
    alignSelf: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.Green900,
  },
  buttonDisabled: {
    backgroundColor: colors.Gray100,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
  },
  buttonTextActive: {
    color: colors.Ivory100,
  },
  buttonTextInactive: {
    color: colors.Gray500,
  },
});

export default UserReviewScreen2;
