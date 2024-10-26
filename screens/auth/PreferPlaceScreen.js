import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient from './ApiClient';

const PreferPlaceScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]); 

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await ApiClient.get('/api/spots');
        if (response.data && response.data.success) {
          setPlaces(response.data.response); 
        } else {
          console.error('Failed to fetch places:', response.data);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchPlaces(); 
  }, []);

  // 장소를 선택하는 함수
  const togglePlace = (placeId) => {
    if (selectedPlaces.includes(placeId)) {
      setSelectedPlaces((prev) => prev.filter((id) => id !== placeId));
    } else if (selectedPlaces.length < 2) {
      setSelectedPlaces((prev) => [...prev, placeId]);
    }
  };

  const isButtonDisabled = selectedPlaces.length === 0;

  const submitPlaces = async () => {
    try {
      if (selectedPlaces.length === 0) {
        Alert.alert('Error', '선택된 장소가 없습니다.');
        return;
      }
  
      const data = {
        spotIds: selectedPlaces
      };
  
      //console.log('Data being sent to server:', data);
  
      const response = await ApiClient.post('/api/users/spots', data);
      //console.log('Response:', response.data);
      
      if (response.data.success) {
        //console.log('Places submitted successfully:', response.data);
        navigation.navigate('MainTab', { screen: 'Main' });
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
        <Image source={require('../../assets/progress_bar2.png')} style={styles.image} />
        <Text style={styles.text}>관심있는 장소를 선택해주세요.</Text>
        <Text style={styles.details}>당신의 주요 활동 장소는 어디인가요? (최대 2개)</Text>
        <View style={styles.tagsContainer}>
          {places.length > 0 ? (
            places.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.tag,
                  selectedPlaces.includes(place.id) ? styles.selectedTag : styles.unselectedTag,
                ]}
                onPress={() => togglePlace(place.id)}
              >
                {/* <Image source={{ uri: place.imgUrl }} style={styles.placeImage} /> */}
                <Text
                  style={[
                    styles.tagText,
                    selectedPlaces.includes(place.id) ? styles.selectedTagText : styles.unselectedTagText,
                  ]}
                >
                  {place.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading places...</Text> // 데이터가 없을 때 보여줄 내용
          )}
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={submitPlaces} // 선택한 장소 전송
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
    marginTop : 10,
  },
  tag: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginVertical: 6,
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

export default PreferPlaceScreen;