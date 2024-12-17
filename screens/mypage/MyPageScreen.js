import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import ApiClient from '../auth/ApiClient';
import { fonts } from '../../config/fonts';
import { checkGuestStatus, handleGuestLogout } from '../auth/component/Guestlogin';



const MyPageScreen = () => {
  const navigation = useNavigation(); 
  const [nickname, setNickname] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);



  // useFocusEffect(
  //   React.useCallback(() => {
  //     const loadUserData = async () => {
  //       try {
  //         // 닉네임 불러오기
  //         const storedNickname = await AsyncStorage.getItem('nickname');
  //         if (storedNickname) {
  //           setNickname(storedNickname);
  //           console.log('로컬 스토리지에서 불러온 닉네임:', storedNickname);
  //         }

  //         // 무드 및 장소 불러오기
  //         const storedMoods = await AsyncStorage.getItem('selectedMoods');
  //         const storedPlaces = await AsyncStorage.getItem('selectedPlaces');
  //         if (storedMoods) {
  //           setSelectedMoods(JSON.parse(storedMoods));
  //           console.log('로컬 스토리지에서 불러온 무드:', JSON.parse(storedMoods));
  //         }
  //         if (storedPlaces) {
  //           setSelectedPlaces(JSON.parse(storedPlaces));
  //           console.log('로컬 스토리지에서 불러온 장소:', JSON.parse(storedPlaces));
  //         }
  //       } catch (error) {
  //         console.error('로컬 스토리지에서 데이터 불러오기 오류:', error);
  //       }
  //     };
  //     loadUserData();
  //   }, [])
  // );

  // 게스트 여부와 사용자 데이터 로드
  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        try {
          const guestUser = await checkGuestStatus(); // 게스트 여부 확인
          setIsGuest(guestUser);

          if (guestUser) {
            const guestId = await AsyncStorage.getItem('guestId');
            console.log('Guest Login Detected:', guestId);
            setNickname(guestId); // 게스트 ID를 닉네임으로 설정
          } else {
            await fetchUserData(); // 일반 사용자 데이터 불러오기
          }
        } catch (error) {
          console.error('데이터 가져오기 실패:', error);
        } finally {
          setLoading(false);
        }
      };
      loadUserData();
    }, [])
  );

  // API에서 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await ApiClient.get('/api/users');
      if (response.data.success) {
        const userData = response.data.response;
        setNickname(userData.nickname);
        setGoogleEmail(userData.googleEmail);
        setSelectedMoods(userData.moods); 
        setSelectedPlaces(userData.spots); 

        await AsyncStorage.setItem('nickname', userData.nickname);
        await AsyncStorage.setItem('selectedMoods', JSON.stringify(userData.moods));
        await AsyncStorage.setItem('selectedPlaces', JSON.stringify(userData.spots));

        //console.log(userData.spots)
      }
    } catch (error) {
      // console.error('데이터 가져오기 실패:', error);
      // Alert.alert('오류', '사용자 데이터를 가져오는 중 문제가 발생했습니다.');
    }
  };

  // // 컴포넌트 마운트 시 사용자 데이터를 가져옴
  // useEffect(() => {
  //   fetchUserData();
  // }, []);
  
  
   // 마이페이지 편집 화면 접근 제어
   const goToMypageEdit = () => {
    if (isGuest) {
      Alert.alert(
        '로그인이 필요한 서비스입니다.',
        '로그인 하시겠습니까?',
        [
          { text: '네', onPress: () => navigation.replace('Login') },
          { text: '아니오', style: 'cancel' },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('MypageEdit');
    }
  };

  const goToSetting = () => {
    navigation.navigate('Setting');
  };

  const goToAnnouce = () => {
    navigation.navigate('Announce');
  };

  const goToInquiry = () => {
    navigation.navigate('Inquiry');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('guestId');
    navigation.replace('Splash');
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
      <View style={styles.header}>
        <Text style={styles.headerText}>마이페이지</Text>
      </View>
      <View style={styles.content}>
        <View style={[styles.profile, { marginTop: -60 }]}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
          <Text style={styles.profileText}>
            <Text style={styles.nicknameText}>{nickname}</Text>
            님, {'\n'}행운을 빌어요!
          </Text>
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
                <Text key={index} style={styles.textWithBorder}>{place.name || 'N/A'}</Text>
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
                <Text key={index} style={styles.textWithBorder}>{mood.name || 'N/A'}</Text>
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
            <Image source={require('../../assets/right_black.png')} style={styles.buttonImage} />
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
  header: {
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 5,
  },
  headerText: {
    ...fonts.Body1,
    fontWeight: '600',
    color: colors.Gray900,
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
    ...fonts.Title1,
  },
  nicknameText: {
    color: colors.Green500,
    ...fonts.Title1,
  },
  editImage: {
    marginTop: -25,
    marginRight: 15,
  },
  preferContainer: {
    flex: 0.4,
    marginTop: 40,
    alignItems: 'flex-start',
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
    ...fonts.Body1,
    color : colors.Gray900,
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
