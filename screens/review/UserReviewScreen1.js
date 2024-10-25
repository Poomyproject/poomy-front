import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors'; // colors가 정의된 파일
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../config/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import ApiClient from '../auth/ApiClient'; // ApiClient import
import { useRoute } from '@react-navigation/native';

const UserReviewScreen1 = () => {
  const [moods, setMoods] = useState([]); // 서버에서 받아온 moods 리스트를 저장할 상태
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedShopId } = route.params;
  
  console.log('상점아이디', selectedShopId);

  // 서버에서 moods 데이터를 가져옴
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await ApiClient.get('/api/moods'); // API 호출
        if (response.data && response.data.success) {
          setMoods(response.data.response); // 응답 데이터에서 'response' 배열을 moods 상태에 저장
        } else {
          console.error('Failed to fetch Moods:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Moods:', error);
      }
    };

    fetchMoods(); // useEffect 실행 시 API 호출
  }, []);

  // 분위기 선택 토글
  const toggleMood = (moodId) => {
    setSelectedMoods((prevMoods) => {
      if (prevMoods.includes(moodId)) {
        // 이미 선택된 분위기가 있으면 제거
        return prevMoods.filter((id) => id !== moodId);
      } else if (prevMoods.length < 2) {
        // 선택된 분위기가 2개 미만이면 추가
        return [...prevMoods, moodId];
      }
      return prevMoods; // 2개 이상일 경우 추가하지 않음
    });
  };

  // 선택된 분위기 확인
  const isSelected = (moodId) => selectedMoods.includes(moodId); // ID를 기준으로 체크
  const isButtonDisabled = selectedMoods.length === 0;

  // 선택된 분위기를 AsyncStorage에 저장
  const handleSaveMood = async () => {
    try {
      await AsyncStorage.setItem('moods', JSON.stringify(selectedMoods)); // 선택한 분위기를 저장
      console.log('선택된 분위기 저장 완료');
      console.log('selectedMoods:', selectedMoods); 

      navigation.navigate('UserReview2', { selectedShopId });
    } catch (error) {
      console.error('저장 오류:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={styles.highlight}>선민이네 샵</Text>
        의 {'\n'}특징을 알려주세요
      </Text>
      <Text style={styles.subHeader}>방문한 소품샵은 어떤 분위기였나요? (최대 2개)</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id} // 객체의 고유한 id를 사용해야 함
            style={[styles.moodButton, isSelected(mood.id) ? styles.moodButtonSelected : null]}
            onPress={() => toggleMood(mood.id)} // ID 기준으로 무드 선택
          >
            <Text style={[styles.moodText, isSelected(mood.id) ? styles.moodTextSelected : null]}>
              {mood.name} {/* mood.name을 사용하여 이름 렌더링 */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 460 }}>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          disabled={isButtonDisabled}
          onPress={handleSaveMood} // 선택한 분위기 저장 및 다음 화면 이동
        >
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
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  moodButton: {
    borderWidth: 1,
    borderColor: colors.Gray100,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  moodButtonSelected: {
    backgroundColor: colors.Green900, // 선택된 버튼의 배경색
  },
  moodText: {
    color: colors.Gray700,
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
    bottom: 72,
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
