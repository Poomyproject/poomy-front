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
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [moodsList, setMoodsList] = useState([]);
  const [placesList, setPlacesList] = useState([]); 
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialMoods, setInitialMoods] = useState([]);
  const [initialPlaces, setInitialPlaces] = useState([]); 
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isApplyButtonActive, setIsApplyButtonActive] = useState(false);
  
  
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const response = await ApiClient.get('/api/users');
      if (response.data.success) {
        const userData = response.data.response;
        setNickname(userData.nickname);
        setGoogleEmail(userData.googleEmail);
        
        const moods = userData.moods.map(mood => ({ id: mood.id, name: mood.name }));
        const places = userData.spots.map(spot => ({ id: spot.id, name: spot.name })); 
  
        setSelectedMoods(moods);
        setSelectedPlaces(places); 
        setInitialMoods(moods);
        setInitialPlaces(places); 
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
      const placesResponse = await ApiClient.get('/api/spots'); 
      if (placesResponse.data.success) {
        setPlacesList(placesResponse.data.response);
      }
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

  const handleSelectPlace = (place) => { 
    setSelectedPlaces((prevPlaces) => {
      if (prevPlaces.some(p => p.id === place.id)) {
        return prevPlaces.filter(p => p.id !== place.id);
      } else if (prevPlaces.length < 2) {
        return [...prevPlaces, { ...place }];
      }
      return prevPlaces;
    });
  };

  const loadSelectedDataFromStorage = async () => {
    try {
      const storedMoods = await AsyncStorage.getItem('selectedMoods');
      const storedPlaces = await AsyncStorage.getItem('selectedPlaces'); 

      if (storedMoods) {
        const parsedMoods = JSON.parse(storedMoods);
        setSelectedMoods(parsedMoods);
        console.log('Loaded moods from storage:', parsedMoods);
      }

      if (storedPlaces) { 
        const parsedPlaces = JSON.parse(storedPlaces);
        setSelectedPlaces(parsedPlaces);
        console.log('Loaded places from storage:', parsedPlaces);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  };

// 상태 변경 감지용 useEffect
useEffect(() => {
  console.log('isButtonActive changed:', isButtonActive);
}, [isButtonActive]);

useEffect(() => {
  console.log('isApplyButtonActive changed:', isApplyButtonActive);
}, [isApplyButtonActive]);

// "적용하기" 버튼 눌렀을 때 호출되는 함수
const applyChanges = async () => {
  try {
    await AsyncStorage.setItem('selectedMoods', JSON.stringify(selectedMoods));
    await AsyncStorage.setItem('selectedPlaces', JSON.stringify(selectedPlaces));

   // console.log('Changes successfully applied to local storage');
    
    // 모달 닫기
    setFirstModalVisible(false);
    setSecondModalVisible(false);
    
    // 완료 버튼 활성화 및 적용하기 버튼 상태 변경
    setIsButtonActive(true);
    setIsApplyButtonActive(true);
    
  } catch (error) {
    //console.error('Error saving to local storage:', error);
  }
};

  // 화면에 포커스가 돌아올 때마다 닉네임 변경 여부를 확인
  useFocusEffect(
    React.useCallback(() => {
      const checkNicknameChange = async () => {
        const nicknameChanged = await AsyncStorage.getItem('isNicknameChanged');
        if (nicknameChanged === 'true') {
          setIsButtonActive(true);
          await AsyncStorage.removeItem('isNicknameChanged'); // 초기화하여 중복 활성화 방지
        }
      };

      checkNicknameChange();
    }, [])
  );

  const handleSaveChanges = async () => {
    try {
      const moodIds = selectedMoods.map(mood => mood.id);
      const placeIds = selectedPlaces.map(place => place.id);

      console.log('Sending moodIds to server:', moodIds);
      await ApiClient.post('/api/users/moods', { moodIds });

      console.log('Sending placeIds to server:', placeIds);
      await ApiClient.post('/api/users/spots', { spotIds: placeIds });

      setInitialMoods(selectedMoods);
      setInitialPlaces(selectedPlaces);

      console.log('Save changes completed, navigating to MyPage');
      navigation.navigate('MyPage'); // MyPage로 이동

    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('오류', '변경사항 저장 중 문제가 발생했습니다.');
    }
  };

  // 모달 열 때 현재 선택 상태 저장
  const openFirstModal = () => {
    setInitialPlaces([...selectedPlaces]);
    setFirstModalVisible(true);
  };

  const openSecondModal = () => {
    setInitialMoods([...selectedMoods]);
    setSecondModalVisible(true);
  };

  const cancelSelection = () => {
    setSelectedMoods(initialMoods); // 모달을 열기 전 상태로 되돌림
    setSelectedPlaces(initialPlaces);
    setFirstModalVisible(false);
    setSecondModalVisible(false);
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
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/left.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지 수정</Text>
        <TouchableOpacity
        style={styles.completeButton}
        disabled={!isButtonActive}
        onPress={handleSaveChanges}
      >
        <Text
          style={[
            styles.headerButtonText,
            isButtonActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          완료
        </Text>
      </TouchableOpacity>
      </View>

  
      <Image source={require('../../assets/defualt.png')} style={styles.profileImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.textColor}>닉네임</Text>
        <TouchableOpacity style={styles.nicknameContainer} onPress={() => navigation.navigate('NameEdit')}>
          <Text>{nickname ? nickname : 'N/A'}</Text>
        </TouchableOpacity>
        <Text style={[styles.textColor, {}]}>계정정보</Text>
        <Text style={[styles.nicknameContainer,{ color : colors.Gray300 }]}>{googleEmail ? googleEmail : 'N/A'}</Text>
  
        <Text style={styles.textColor}>관심 장소</Text>
        <TouchableOpacity onPress={openFirstModal} style={styles.moodTextContainer}>
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
      </TouchableOpacity>

        <Text style={styles.textColor}>관심 분위기</Text>
        <TouchableOpacity onPress={openSecondModal} style={styles.moodTextContainer}>
        {selectedMoods.length === 0 ? (
          <Text>분위기</Text>
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
        
        <Modal
          isVisible={isFirstModalVisible}
          onBackdropPress={() => setFirstModalVisible(false)}
          swipeDirection="down"
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.text}>장소</Text>
            <TouchableOpacity onPress={cancelSelection}>
              <Image source={require('../../assets/close.png')} style={styles.image} />
            </TouchableOpacity>
          </View>
            <View style={styles.moodContainer}>
              {placesList.map((place) => (
                <TouchableOpacity
                  key={place.id}
                  style={[
                    styles.moodButton,
                    selectedPlaces.some((p) => p.id === place.id) ? styles.selectedMood : {} // selectedPlace 스타일 적용
                  ]}
                  onPress={() => handleSelectPlace(place)}
                >
                  <Text
                  style={[
                    styles.moodText,
                    selectedPlaces.some((p) => p.id === place.id) ? styles.selectedPlaceText : {}
                  ]}
                >
                  {place.name ? place.name : 'N/A'}
                </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
            onPress={applyChanges}
            style={[
              styles.closeButton,
              selectedPlaces.length === 0 ? styles.disabledButton : {}
            ]}
            disabled={selectedPlaces.length === 0}
          >
            <Text
              style={[
                styles.closeButtonText,
                selectedPlaces.length === 0 ? styles.disabledButtonText : {}
              ]}
            >
              적용하기
            </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={isSecondModalVisible}
          onBackdropPress={() => setSecondModalVisible(false)}
          swipeDirection="down"
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={styles.text}>분위기 선택</Text>
            <TouchableOpacity onPress={cancelSelection}>
              <Image source={require('../../assets/close.png')} style={styles.image} />
            </TouchableOpacity>
          </View>
            <View style={styles.moodContainer}>
              {moodsList.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[styles.moodButton, selectedMoods.some(m => m.id === mood.id) ? styles.selectedMood : {}]}
                  onPress={() => handleSelectMood(mood)}
                >
                  <Text
                  style={[
                    styles.moodText,
                    selectedMoods.some((m) => m.id === mood.id) ? styles.selectedMoodText : {}
                  ]}
                >
                  {mood.name ? mood.name : 'N/A'}
                </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
            onPress={applyChanges}
            style={[
              styles.closeButton,
              selectedMoods.length === 0 ? styles.disabledButton : {}
            ]}
            disabled={selectedMoods.length === 0}
          >
            <Text
              style={[
                styles.closeButtonText,
                selectedMoods.length === 0 ? styles.disabledButtonText : {}
              ]}
            >
              적용하기
            </Text>
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
    marginTop : 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.Ivory100,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray100,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.Gray900,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  activeText: {
    color: colors.Green900, // 활성화 상태에서 텍스트 색상
  },
  inactiveText: {
    color: colors.Gray300, // 비활성화 상태에서 텍스트 색상
  },
  headerButtonText: {
    padding: 5,
    ...fonts.Body2,
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
    borderColor: colors.Gray100,        
    borderWidth: 1,              
    borderRadius: 5,             
    padding: 15,                
    marginTop: 10,  
    width: '100%',
  },
  moodTextContainer : {
    backgroundColor: colors.Ivory300,  
    borderColor: colors.Gray100,        
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
    marginTop: 80,
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
  selectedPlaceText: {
    color: colors.Ivory100, // 선택된 장소 텍스트 색상 흰색
  },
  selectedMoodText: {
    color: colors.Ivory100, // 선택된 분위기 텍스트 색상 흰색
  },
  disabledButton: {
    backgroundColor: colors.Gray100,
    textColor : colors.Gray400,
  },
  disabledButtonText: {
    color: colors.Gray400, // 비활성화된 텍스트 색상
  },
  text : {
    ...fonts.Body1,
  }
});

export default MypageEditScreen;
