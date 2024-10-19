import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient from './ApiClient';

const PreferSelectScreen = ({ navigation }) => {
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);

  useEffect(() => {
    // 장소 데이터를 GET 요청으로 서버에서 받아옴
    const fetchMoods = async () => {
      try {
        const response = await ApiClient.get('/api/moods');
        if (response.data && response.data.success) {
          setMoods(response.data.response); // 응답에서 'response' 배열을 상태에 저장
        } else {
          console.error('Failed to fetch Moods:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Moods:', error);
      }
    };

    fetchMoods();
  }, []);

   // 장소를 선택하는 함수
   const toggleMood = (moodId) => {
    if (selectedMoods.includes(moodId)) {
      setSelectedMoods((prev) => prev.filter((id) => id !== moodId));
    } else if (selectedMoods.length < 2) {
      setSelectedMoods((prev) => [...prev, moodId]);
    }
  };

  const isButtonDisabled = selectedMoods.length === 0;


  const submitMoods = async () => {
    try {
      if (selectedMoods.length === 0) {
        Alert.alert('Error', '선택된 장소가 없습니다.');
        return;
      }
  
      const data = {
        moodIds: selectedMoods
      };
  
      //console.log('Data being sent to server:', data);
  
      const response = await ApiClient.post('/api/users/moods', data);
      //console.log('Response:', response.data);
      
      if (response.data.success) {
        //console.log('Places submitted successfully:', response.data);
        navigation.navigate('PreferPlace');
      } else {
        console.error('Error:', response.data);
        Alert.alert('Error', 'Failed to submit selected places.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
      Alert.alert('Error', 'An error occurred while submitting the places.');
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <Image source={require('../../assets/progress_bar1.png')} style={styles.image}></Image>
        <Text style={styles.text}>당신의 취향을 선택해 주세요</Text>
        <Text style={styles.details}>당신의 소품샵 취향은 무엇인가요? (최대 2개)</Text>
        <View style={styles.tagsContainer}>
          {moods.length > 0 ? (
            moods.map((moods) => (
              <TouchableOpacity
                key={moods.id}
                style={[
                  styles.tag,
                  selectedMoods.includes(moods.id) ? styles.selectedTag : styles.unselectedTag,
                ]}
                onPress={() => toggleMood(moods.id)}
              >
                <Image source={{ uri: moods.imgUrl }} style={styles.placeImage} />
                <Text
                  style={[
                    styles.tagText,
                    selectedMoods.includes(moods.id) ? styles.selectedTagText : styles.unselectedTagText,
                  ]}
                >
                  {moods.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading Moods...</Text> // 데이터가 없을 때 보여줄 내용
          )}
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={submitMoods} // 선택한 장소 전송
          disabled={isButtonDisabled}
        >
          <Text style={[styles.buttonText, isButtonDisabled ? styles.buttonTextInactive : styles.buttonTextActive]}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, 
    backgroundColor: colors.Ivory100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: -10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 48,
    height: 8,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    ...fonts.Heading1,
    textAlign: 'left',
    marginBottom: 10,
  },
  details: {
    ...fonts.Body2,
    color: colors.Gray700,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tag: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  selectedTag: {
    backgroundColor: colors.Green900,
    borderColor: colors.Green900,
  },
  unselectedTag: {
    backgroundColor: colors.Ivory100,
    borderColor: colors.Gray100,
  },
  selectedTagText: {
    color: colors.Ivory100,
    ...fonts.Body2,
  },
  unselectedTagText: {
    color: colors.Gray700,
    ...fonts.Body2,
  },
  placeImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
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

export default PreferSelectScreen;