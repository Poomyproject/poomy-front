import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ApiClient from '../auth/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../../config/fonts';

const MypageEditScreen = () => {
  const [nickname, setNickname] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [selectedMoods, setSelectedMoods] = useState([]);
  // const [selectedPlaces, setSelectedPlaces] = useState([]); // 장소 관련 부분 주석 처리
  const [moodsList, setMoodsList] = useState([]);
  // const [placesList, setPlacesList] = useState([]); // 장소 관련 부분 주석 처리
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialMoods, setInitialMoods] = useState([]);
  // const [initialPlaces, setInitialPlaces] = useState([]); // 장소 관련 부분 주석 처리
  
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const response = await ApiClient.get('/api/users');
      if (response.data.success) {
        const userData = response.data.response;
        setNickname(userData.nickname);
        setGoogleEmail(userData.googleEmail);
        
        const moods = userData.moods.map(mood => ({ id: mood.id, name: mood.name }));
        // const places = userData.spots.map(spot => ({ id: spot.id, name: spot.name })); // 장소 관련 부분 주석 처리
  
        setSelectedMoods(moods);
        // setSelectedPlaces(places); // 장소 관련 부분 주석 처리
        setInitialMoods(moods);
        // setInitialPlaces(places); // 장소 관련 부분 주석 처리
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoodsAndPlaces = async () => {
    try {
      const moodsResponse = await ApiClient.get('/api/moods');
      if (moodsResponse.data.success) {
        setMoodsList(moodsResponse.data.response);
      }
      // const placesResponse = await ApiClient.get('/api/spots'); // 장소 관련 부분 주석 처리
      // if (placesResponse.data.success) {
      //   setPlacesList(placesResponse.data.response);
      // }
    } catch (error) {
      console.error('Failed to fetch moods or places:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchMoodsAndPlaces();
      loadSelectedDataFromStorage();
    }, [])
  );

  const handleSelectMood = (mood) => {
    setSelectedMoods((prevMoods) => {
      if (prevMoods.some(m => m.id === mood.id)) {
        return prevMoods.filter(m => m.id !== mood.id);
      } else if (prevMoods.length < 2) {
        return [...prevMoods, { ...mood }];
      }
      return prevMoods;
    });
  };

  // const handleSelectPlace = (place) => { // 장소 관련 부분 주석 처리
  //   setSelectedPlaces((prevPlaces) => {
  //     if (prevPlaces.some(p => p.id === place.id)) {
  //       return prevPlaces.filter(p => p.id !== place.id);
  //     } else if (prevPlaces.length < 2) {
  //       return [...prevPlaces, { ...place }];
  //     }
  //     return prevPlaces;
  //   });
  // };

  const loadSelectedDataFromStorage = async () => {
    try {
      const storedMoods = await AsyncStorage.getItem('selectedMoods');
      // const storedPlaces = await AsyncStorage.getItem('selectedPlaces'); // 장소 관련 부분 주석 처리

      if (storedMoods) {
        const parsedMoods = JSON.parse(storedMoods);
        setSelectedMoods(parsedMoods);
        console.log('Loaded moods from storage:', parsedMoods);
      }

      // if (storedPlaces) { // 장소 관련 부분 주석 처리
      //   const parsedPlaces = JSON.parse(storedPlaces);
      //   setSelectedPlaces(parsedPlaces);
      //   console.log('Loaded places from storage:', parsedPlaces);
      // }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  };

  const applyChanges = async () => {
    try {
      console.log('Storing selectedMoods to local storage:', selectedMoods);
      // console.log('Storing selectedPlaces to local storage:', selectedPlaces); // 장소 관련 부분 주석 처리

      await AsyncStorage.setItem('selectedMoods', JSON.stringify(selectedMoods));
      // await AsyncStorage.setItem('selectedPlaces', JSON.stringify(selectedPlaces)); // 장소 관련 부분 주석 처리

      console.log('Changes successfully applied to local storage');
      setFirstModalVisible(false);
      setSecondModalVisible(false);
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const moodIds = selectedMoods.map(mood => mood.id);
      // const placeIds = selectedPlaces.map(place => place.id); // 장소 관련 부분 주석 처리

      console.log('Sending moodIds to server:', moodIds);
      await ApiClient.post('/api/users/moods', { moodIds });

      // console.log('Sending placeIds to server:', placeIds); // 장소 관련 부분 주석 처리
      // await ApiClient.post('/api/users/spots', { spotIds: placeIds }); // 장소 관련 부분 주석 처리

      setInitialMoods(selectedMoods);
      // setInitialPlaces(selectedPlaces); // 장소 관련 부분 주석 처리

      console.log('Save changes completed, navigating back');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  // 로딩 상태 표시
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.Green900} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/left.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지 수정</Text>
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.headerButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
  
      <Image source={require('../../assets/defualt.png')} style={styles.profileImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.textColor}>닉네임</Text>
        <TouchableOpacity style={styles.nicknameContainer} onPress={() => navigation.navigate('NameEdit')}>
          <Text>{nickname ? nickname : 'N/A'}</Text>
        </TouchableOpacity>
        <Text style={styles.textColor}>계정정보</Text>
        <Text style={styles.nicknameContainer}>{googleEmail ? googleEmail : 'N/A'}</Text>
  
        {/* <Text style={styles.textColor}>관심 장소</Text>
        <TouchableOpacity onPress={() => setFirstModalVisible(true)} style={styles.moodTextContainer}>
          {selectedPlaces.length === 0 ? (
            <Text>장소 선택</Text>
          ) : (
            <View style={styles.selectedMoodsContainer}>
              {selectedPlaces.map((place, index) => (
                <View key={index} style={styles.moodTag}>
                  <Text style={styles.moodTagText}>{place.name ? place.name : 'N/A'}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity> */}

        <Text style={styles.textColor}>관심 분위기</Text>
        <TouchableOpacity onPress={() => setSecondModalVisible(true)} style={styles.moodTextContainer}>
          {selectedMoods.length === 0 ? (
            <Text>분위기 선택</Text>
          ) : (
            <View style={styles.selectedMoodsContainer}>
              {selectedMoods.map((mood, index) => (
                <View key={index} style={styles.moodTag}>
                  <Text style={styles.moodTagText}>{mood.name ? mood.name : 'N/A'}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
  
        {/* <Modal
          isVisible={isFirstModalVisible}
          onBackdropPress={() => setFirstModalVisible(false)}
          swipeDirection="down"
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
          <Text style={styles.text}>장소 선택</Text>
          <View style={styles.moodContainer}>
            {placesList.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.moodButton,
                  selectedPlaces.some((p) => p.id === place.id) ? styles.selectedPlace : {}
                ]}
                onPress={() => handleSelectPlace(place)}
              >
                <Text style={styles.moodText}>{place.name ? place.name : 'N/A'}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => {
            applyChanges();
            setFirstModalVisible(false);
          }} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>적용하기</Text>
          </TouchableOpacity>
        </View>
        </Modal> */}

        <Modal
          isVisible={isSecondModalVisible}
          onBackdropPress={() => setSecondModalVisible(false)}
          swipeDirection="down"
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.text}>분위기 선택</Text>
            <View style={styles.moodContainer}>
              {moodsList.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[styles.moodButton, selectedMoods.some(m => m.id === mood.id) ? styles.selectedMood : {}]}
                  onPress={() => handleSelectMood(mood)}
                >
                  <Text style={styles.moodText}>{mood.name ? mood.name : 'N/A'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={applyChanges} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Ivory100,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: colors.Ivory100,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray300,
  },
  backButton: {
    padding: 5,
  },
  backButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    marginTop : 35, 
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.Gray900,
  },
  headerButtonText: {
    color: colors.Gray700,
    padding : 5, 
  },
  contentContainer: {
    width: '90%',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 110,
    height: 110,
    marginTop: 35,
    justifyContent: 'center',
  },
  textColor: {
    color: colors.Gray300,
    ...fonts.Body4,
    marginTop: 35,
  },
  nicknameContainer: {
    backgroundColor: colors.Ivory300,  
    borderColor: colors.Gray300,        
    borderWidth: 1,              
    borderRadius: 5,             
    padding: 15,                
    marginTop: 10,  
    width: '100%',
  },
  moodTextContainer : {
    backgroundColor: colors.Ivory300,  
    borderColor: colors.Gray300,        
    borderWidth: 1,              
    borderRadius: 10,             
    padding: 10,                
    marginTop: 10,  
    width: '100%',
  },
  selectedMoodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  moodTag: {
    backgroundColor: colors.Ivory100,
    borderColor: colors.Green500,  
    borderWidth: 1,  
    paddingVertical: 5,  
    paddingHorizontal: 15,  
    borderRadius: 25, 
    marginRight: 10,  
    marginTop : -5, 
  },
  moodTagText: {
    color: colors.Gray700, 
    ...fonts.Caption1,
    fontWeight: 'bold', 
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.Ivory100,
    padding: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moodButton: {
    borderWidth: 1,
    borderColor: colors.Gray100,
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  selectedMood: {
    backgroundColor: colors.Green900,
    borderColor: colors.Green900,
  },
  closeButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.Green900,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: colors.Ivory100,
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MypageEditScreen;
