import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import MypageEditScreen from './MypageEditScreen';
import ApiClient from '../auth/ApiClient';
import { useEffect,useState } from 'react';
import { fonts } from '../../config/fonts';


const MyPageScreen = () => {
  const navigation = useNavigation(); 

  const [nickname, setNickname] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [moods, setMoods] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await ApiClient.get('/api/users');
        const data = response.data.response;

        setNickname(data.nickname);
        setGoogleEmail(data.googleEmail);
        setImgUrl(data.imgUrl);
        setMoods(data.moods);
        setPlaces(data.spots);

        console.log('User Info:', data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
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
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>
      </View>
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
            {places.length > 0 ? (
            places.map((place) => (
            <Text key={place.id} style={styles.textWithBorder}>#{place.name}</Text>
            ))
            ) : (
            <Text>관심장소가 없습니다.</Text>
            )}
          </View>
          <View style={[styles.preferBox, { marginTop: -30 }]}>
            <Image source={require('../../assets/headphones.png')} style={styles.preferIcon} />
            <Text style={styles.preferText}>관심분위기</Text>
            <View style={styles.verticalLine}></View>
            
            {moods.length > 0 ? (
            moods.map((mood) => (
            <Text key={mood.id} style={styles.textWithBorder}>#{mood.name}</Text>
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
  headerContainer: {
    flex: 0.18,
    justifyContent: 'flex-end',
  },
  header: {
    height: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
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
    padding: 6,
    margin: 5,
    borderRadius: 16,
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
