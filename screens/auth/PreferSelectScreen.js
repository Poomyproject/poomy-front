import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient from './ApiClient';

const PreferSelectScreen = ({ navigation }) => {
  const [moods, setMoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await ApiClient.get('/api/moods');
        if (response.data && response.data.success) {
          setMoods(response.data.response); 
        } else {
          console.error('Failed to fetch Moods:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Moods:', error);
      }
    };

    fetchMoods();
  }, []);

  const getImageForMood = (moodName, isSelected) => {
    if (isSelected) {
      switch (moodName) {
        case '모던':
          return require('../../assets/img_selected_modern.png');
        case '럭셔리':
          return require('../../assets/img_selected_luxury.png');
        case '아기자기':
          return require('../../assets/img_selected_cute.png');
        case '테마별':
          return require('../../assets/img_selected_theme.png');
        case '빈티지':
          return require('../../assets/img_selected_vintage.png');
        default:
          return require('../../assets/img_default.png');
      }
    } else {
      switch (moodName) {
        case '모던':
          return require('../../assets/img_modern.png');
        case '럭셔리':
          return require('../../assets/img_luxury.png');
        case '아기자기':
          return require('../../assets/img_cute.png');
        case '테마별':
          return require('../../assets/img_theme.png');
        case '빈티지':
          return require('../../assets/img_vintage.png');
        default:
          return require('../../assets/img_default.png');
      }
    }
  };
  
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
  
      const data = { moodIds: selectedMoods };
      const response = await ApiClient.post('/api/users/moods', data);
      
      if (response.data.success) {
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
            moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={styles.tag} 
                onPress={() => toggleMood(mood.id)}
              >
                <Image source={getImageForMood(mood.name, selectedMoods.includes(mood.id))} style={styles.placeImage} />
                <Text style={styles.tagText}> 
                  {mood.name}
                </Text>
              </TouchableOpacity>

            ))
          ) : (
            <Text>Loading Moods...</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={submitMoods}
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
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  tag: {
    borderRadius: 0,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  placeImage: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },
  tagText: {
    color: colors.Gray700, // 항상 동일한 텍스트 색상
    marginTop : 3,
    ...fonts.Body2,
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