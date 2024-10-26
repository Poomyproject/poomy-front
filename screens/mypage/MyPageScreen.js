import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import MypageEditScreen from './MypageEditScreen';
import ApiClient from '../auth/ApiClient';
import { useEffect,useState, useContext } from 'react';
import { fonts } from '../../config/fonts';
import { useFocusEffect } from '@react-navigation/native';



const MyPageScreen = () => {
  const navigation = useNavigation(); 

  const [nickname, setNickname] = useState('');
  const [googleEmail, setgoogleEmail] = useState('');
  const [imgUrl, setImgUrl] = useState(''); // 이미지 URL 관리 추가
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

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

          await AsyncStorage.setItem('nickname', userData.nickname);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        Alert.alert('오류', '사용자 데이터를 가져오는 중 문제가 발생했습니다.');
      }
    };
    
  
    // 컴포넌트 마운트 시 사용자 데이터를 가져옴
    useEffect(() => {
      fetchUserData();
    }, []);


  const goToMypageEdit = () => {
    navigation.navigate('MypageEdit');
  };

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  const goToAnnouce = () => {
    navigation.navigate('Announce');
  };

  const goToInquiry = () => {
    navigation.navigate('Inquiry')
  };

  const handleLogout = async () => {
    try {
      // AsyncStorage에서 accessToken 제거
      await AsyncStorage.removeItem('accessToken');

      // 로그인 화면으로 이동
      navigation.replace('Splash');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      Alert.alert('로그아웃 오류', '로그아웃 중 문제가 발생했습니다.');
    }
  };


  const confirmLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃하시겠습니까?',
      [
        {
          text: '아니오',
          onPress: () => console.log('로그아웃 취소됨'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.profile, { marginTop: -60 }]}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
          <Text style={styles.profileText}>{nickname}{'\n'}행운을 빌어요!</Text>
          <TouchableOpacity onPress={goToMypageEdit}>
      <Image source={require('../../assets/edit.png')} style={styles.editImage} />
    </TouchableOpacity>
        </View>
        <View style={styles.preferContainer}>
        <View style={styles.preferBox}>
    <Image source={require('../../assets/mappin.png')} style={styles.preferIcon} />
    <Text style={styles.preferText}>관심장소</Text>
    <View style={styles.verticalLine}></View>
    {selectedPlaces && selectedPlaces.length > 0 ? (
      selectedPlaces.map((place, index) => (
        <Text key={index} style={styles.textWithBorder}>{place}</Text>
      ))
    ) : (
      <Text>관심장소가 없습니다.</Text>
    )}
  </View>
          <View style={[styles.preferBox, { marginTop: -30 }]}>
            <Image source={require('../../assets/headphones.png')} style={styles.preferIcon} />
            <Text style={styles.preferText}>관심분위기</Text>
            <View style={styles.verticalLine}></View>
            
            {selectedMoods && selectedMoods.length > 0 ? (
            selectedMoods.map((mood, index) => (
              <Text key={index} style={styles.textWithBorder}>{mood}</Text>
            ))
          ) : (
            <Text>관심분위기가 없습니다.</Text>
          )}
          </View>
        </View>

        <View>
          <View style={[{ marginTop: -40 }]}>
            <TouchableOpacity style={styles.buttonBox} onPress={goToSetting}>
              <Text style={styles.buttonText}>환경설정</Text>
              <Image source={require('../../assets/right_black.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity style={styles.buttonBox} onPress={goToAnnouce}>
            <Text style={styles.buttonText}>공지사항</Text>
            <Image source={require('../../assets/right_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.buttonBox} onPress={goToInquiry}>
            <Text style={styles.buttonText}>문의사항</Text>
            <Image source={require('../../assets/right_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={[styles.buttonBox, { marginTop: 60 }]} onPress={confirmLogout}>
            <Text style={styles.buttonText}>로그아웃</Text>
            <Image source={require('../../assets/right_black.png')} style={styles.buttonImage}  />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.buttonBox}>
            <Text style={styles.buttonText}>탈퇴</Text>
            <Image source={require('../../assets/right_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Ivory100,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 90,
  },
  profile: {
    flex: 0.2,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
  },
   editImage : {
    marginTop : -25,
    marginRight : 15, 
   },
  preferContainer: {
    flex: 0.4,
    marginTop: 40,
    alignItems: 'left',
  },

  preferBox: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -30,
  },

  preferIcon: {
    width: 24,
    height: 24,
  },

  preferText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '200',
    color: colors.Gray700,
    marginLeft: 8,
  },
  
  verticalLine: {
    width: 1,
    height: '40%',
    backgroundColor: colors.Gray200,
    marginRight: 40,
  },

  textWithBorder: {
    borderWidth: 1,
    borderColor: colors.Green500,
    padding: 7,
    margin: 5,
    borderRadius: 14,
    fontSize: 12,
  },

  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 380,
  },

  buttonText: {
    ...fonts.Body1
  },

  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 10,

  },

  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.Gray100,
    marginLeft: -10,
  },
});

export default MyPageScreen;
