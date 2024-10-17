import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors'; // colors가 정의된 파일
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../config/fonts';

const moods = ['아기자기', '모던', '빈티지', '럭셔리', '테마별'];

const UserReviewScreen1 = () => {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const toggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      // 이미 선택된 분위기인 경우 -> 선택 해제
      setSelectedMoods(selectedMoods.filter((item) => item !== mood));
    } else {
      // 선택된 분위기가 2개 미만일 때만 추가 가능
      if (selectedMoods.length < 2) {
        setSelectedMoods([...selectedMoods, mood]);
      }
    }
  };

  const isSelected = (mood) => selectedMoods.includes(mood);
  const isButtonDisabled = selectedMoods.length === 0;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
      <Text style={styles.highlight}>선민이네 샵</Text>
      의 {'\n'}특징을 알려주세요</Text>
      <Text style={styles.subHeader}>방문한 소품샵은 어떤 분위기였나요? (최대 2개)</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[styles.moodButton, isSelected(mood) ? styles.moodButtonSelected : null]}
            onPress={() => toggleMood(mood)}
          >
            <Text style={[styles.moodText, isSelected(mood) ? styles.moodTextSelected : null]}>
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style = {{marginTop: 460}}>
      <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          // onPress={submitMoods} // API연결
          disabled={isButtonDisabled}
          onPress={() => navigation.navigate('UserReview2')}>
          <Text style={[styles.buttonText, isButtonDisabled ? styles.buttonTextInactive : styles.buttonTextActive]}>
            다음으로
          </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:colors.Ivory100,
  },
  highlight: {
    color: colors.Green900,
    ...fonts.Title2,
    },  
  header: {
    ...fonts.Title2,
    marginTop : 40,
    marginBottom: 10,
  },
  subHeader: {
    ...fonts.Body2,
    marginBottom: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop:20,
  },
  moodButton: {
    borderWidth: 1,
    borderColor: colors.Gray400,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  moodButtonSelected: {
    backgroundColor: colors.Green900, // 선택된 버튼의 배경색
  },
  moodText: {
    color: colors.Gray600,
    fontSize: 14,
  },
  moodTextSelected: {
    color: colors.Ivory100, // 선택된 버튼의 텍스트 색상
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

export default UserReviewScreen1;
