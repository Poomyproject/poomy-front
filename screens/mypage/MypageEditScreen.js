import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import Modal from 'react-native-modal';
import ApiClient from '../auth/ApiClient'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const MypageEditScreen = () => {

  const [nickname, setNickname] = useState('');
  const [googleEmail, setgoogleEmail] = useState('');
  const [imgUrl, setImgUrl] = useState(''); // 이미지 URL 관리 추가
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true); // 로딩 상태 추가


  // 완료 버튼을 눌렀을 때 변경사항 서버로 전송
  const handleSaveChanges = async () => {
    if (selectedPlaces.length === 0) {
      console.log('장소를 최소 1개 선택해야 합니다.');
      return;
    }

    const data = {
      nickname,
      googleEmail,
      places: selectedPlaces,
      moods: selectedMoods,
    };

    try {
      const response = await ApiClient.post('/api/users', data);
      if (response.data.success) {
        console.log('변경사항 저장 성공');
      }
    } catch (error) {
      console.error('저장 오류:', error);
    }
  };

  // API에서 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await ApiClient.get('/api/users'); // API 호출
      if (response.data.success) {
        const userData = response.data.response;
        setNickname(userData.nickname);
        setgoogleEmail(userData.googleEmail);
        setSelectedMoods(userData.moods.map(mood => mood.name));
        setSelectedPlaces(userData.spots.map(spot => spot.name));
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false); // 데이터 로드 완료 후 로딩 상태 해제
    }
  };

  // 컴포넌트 마운트 시 사용자 데이터를 가져옴
  useEffect(() => {
    fetchUserData();
  }, []);

  // 첫 번째 모달 토글 함수
  const togglePlaceModal = () => {
    setFirstModalVisible(!isFirstModalVisible);
  };

  // 두 번째 모달 토글 함수
  const toggleMoodModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };

  const handleSelectPlace = (place) => {
    setSelectedPlaces((prevPlaces) => {
      if (prevPlaces.includes(place)) {
        // 이미 선택된 장소가 있는 경우, 해당 장소를 제거
        return prevPlaces.filter(p => p !== place);
      } else if (prevPlaces.length < 2) {
        // 선택된 장소가 2개 미만일 경우 추가
        return [...prevPlaces, place];
      }
      return prevPlaces; // 2개 이상이면 더 이상 추가하지 않음
    });
  };

  // 선택된 장소 상태 변경을 모니터링
  useEffect(() => {
    console.log('선택된 장소:', selectedPlaces);
  }, [selectedPlaces]);

  const handleSelectMood = (mood) => {
    setSelectedMoods((prevMoods) => {
      if (prevMoods.includes(mood)) {
        // 이미 선택된 분위기를 제거
        return prevMoods.filter(m => m !== mood);
      } else if (prevMoods.length < 2) {
        // 선택된 분위기가 2개 미만일 경우 추가
        return [...prevMoods, mood];
      }
      return prevMoods; 
    })
  };

  useFocusEffect(
    React.useCallback(() => {
      // 화면이 다시 포커스될 때 닉네임 상태를 업데이트
      const loadNickname = async () => {
        const storedNickname = await AsyncStorage.getItem('nickname');
        if (storedNickname) {
          setNickname(storedNickname); // 닉네임이 변경된 상태를 반영
        }
      };
      loadNickname();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.Green900} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/defualt.png')} style={styles.profileImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.textColor}>닉네임</Text>
        <TouchableOpacity style={styles.nicknameContainer} onPress={() => navigation.navigate('NameEdit')}>
          <Text>{nickname}</Text>
        </TouchableOpacity>
        
        <Text style={styles.textColor}>계정정보</Text>
        <Text style={styles.nicknameContainer}>{googleEmail}</Text>
         
        {/* 첫 번째 관심 장소 선택 */}
        <Text style={styles.textColor}>관심 장소</Text>
        <TouchableOpacity onPress={togglePlaceModal} style={styles.moodTextContainer}>
          {selectedPlaces.length === 0 ? (
            <Text>장소 선택</Text>
          ) : (
            <View style={styles.selectedMoodsContainer}>
              {selectedPlaces.map((place, index) => (
                <View key={index} style={styles.moodTag}>
                  <Text style={styles.moodTagText}>{place}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* 두 번째 관심 분위기 선택 */}
        <Text style={styles.textColor}>관심 분위기</Text>
        <TouchableOpacity onPress={toggleMoodModal} style={styles.moodTextContainer}>
          {selectedMoods.length === 0 ? (
            <Text>분위기 선택</Text>
          ) : (
            <View style={styles.selectedMoodsContainer}>
              {selectedMoods.map((mood, index) => (
                <View key={index} style={styles.moodTag}>
                  <Text style={styles.moodTagText}>{mood}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* 첫 번째 모달 (장소 선택) */}
        <Modal
          isVisible={isFirstModalVisible}
          onBackdropPress={togglePlaceModal}
          swipeDirection="down"
          style={styles.bottomModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContent}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>장소 선택</Text>
              <Image source={require('../../assets/close.png')} style={styles.image} />
            </View>
            <View style={styles.moodContainer}>
              {['강남', '명동', '북촌 한옥마을', '성수', '송리단길', '영등포', '이태원', '종로', '혜화'].map((place) => (
                <TouchableOpacity
                  key={place}
                  style={[styles.moodButton, selectedPlaces.includes(place) ? styles.selectedPlace : {}]}  // selectedPlace 스타일 확인
                  onPress={() => handleSelectPlace(place)}  // place로 전달
                >
                  <Text style={styles.moodText}>{place}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={togglePlaceModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* 두 번째 모달 (분위기 선택) */}
        <Modal
          isVisible={isSecondModalVisible}
          onBackdropPress={toggleMoodModal}
          swipeDirection="down"
          style={styles.bottomModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContent}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>분위기 선택</Text>
              <Image source={require('../../assets/close.png')} style={styles.image} />
            </View>
            <View style={styles.moodContainer}>
              {['코지', '럭셔리', '모던', '아기자기한', '빈티지', '테마별'].map((mood) => (
                <TouchableOpacity
                  key={mood}
                  style={[styles.moodButton, selectedMoods.includes(mood) ? styles.selectedMood : {}]}  // selectedMood 스타일 적용
                  onPress={() => handleSelectMood(mood)}  // mood로 전달
                >
                  <Text style={styles.moodText}>{mood}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={toggleMoodModal} style={styles.closeButton}>
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
  textInput: {
    height: 50,
    width: '100%',
    borderColor: colors.Gray300,
    borderWidth: 1,
    backgroundColor: colors.Gray100,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 8,
    ...fonts.Body2,
    justifyContent: 'center',
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

  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  text: {
    flex: 1,
    ...fonts.Body1,
  },

  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
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
  selectedPlace: {
    backgroundColor: colors.Green900,
    borderColor: colors.Green900,
  },

  moodText: {
    fontSize: 16,
    color: colors.Gray900,
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
  saveButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.Green900,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
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
