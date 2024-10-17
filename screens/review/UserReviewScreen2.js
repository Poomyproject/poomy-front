import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { useNavigation } from '@react-navigation/native';

const UserReviewScreen2 = () => {
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 이미지를 관리하는 상태
  const navigation = useNavigation();

  // 버튼 활성화 여부
  const isButtonDisabled = selectedOption === null;

  const handleSelectOption = (option) => {
    if (selectedOption === option) {
      // 동일한 이미지를 다시 누르면 비활성화 (선택 해제)
      setSelectedOption(null);
    } else {
      // 다른 이미지를 선택하면 그 이미지를 활성화
      setSelectedOption(option);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={styles.highlight}>선민이네 샵</Text>
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
        onPress={() => navigation.navigate('UserReview3')}
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
    position: 'absolute',
    bottom: 94,
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
