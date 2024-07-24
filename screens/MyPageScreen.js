import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPageScreen = () => {
  const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옵니다

  const goToSetting = () => {
    navigation.navigate('Setting'); // 'Setting' 화면으로 이동
  };

  const goToAnnouce = () => {
    navigation.navigate('Announce');
  };

  const goToInquiry = () => {
    navigation.navigate('Inquiry')
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
          <Image source={require('../assets/profile.png')} style={styles.profileImage} />
          <Text style={styles.profileText}>이름님,{'\n'}행운을 빌어요!</Text>
        </View>
        <View style={styles.preferContainer}>
          <View style={styles.preferBox}>
            <Image source={require('../assets/mappin.png')} style={styles.preferIcon} />
            <Text style={styles.preferText}>관심장소</Text>
            <View style={styles.verticalLine}></View>
            <Text style={styles.textWithBorder}>#이태원</Text>
            <Text style={styles.textWithBorder}>#혜화/대학로</Text>
          </View>
          <View style={[styles.preferBox, { marginTop: -30 }]}>
            <Image source={require('../assets/headphones.png')} style={styles.preferIcon} />
            <Text style={styles.preferText}>관심분위기</Text>
            <View style={styles.verticalLine}></View>
            <Text style={styles.textWithBorder}>#온화한</Text>
            <Text style={styles.textWithBorder}>#아기자기한</Text>
          </View>
        </View>

        <View>
          <View style={[{ marginTop: -40 }]}>
            <TouchableOpacity style={styles.buttonBox} onPress={goToSetting}>
              <Text style={styles.buttonText}>환경설정</Text>
              <Image source={require('../assets/left_black.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>
          <TouchableOpacity style={styles.buttonBox} onPress={goToAnnouce}>
            <Text style={styles.buttonText}>공지사항</Text>
            <Image source={require('../assets/left_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.buttonBox} onPress={goToInquiry}>
            <Text style={styles.buttonText}>문의사항</Text>
            <Image source={require('../assets/left_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={[styles.buttonBox, { marginTop: 60 }]}>
            <Text style={styles.buttonText}>로그아웃</Text>
            <Image source={require('../assets/left_black.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.buttonBox}>
            <Text style={styles.buttonText}>탈퇴</Text>
            <Image source={require('../assets/left_black.png')} style={styles.buttonImage} />
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
    backgroundColor: '#ffffff',
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
    color: "#666666",
    marginLeft: 8,
  },
  verticalLine: {
    width: 1,
    height: '40%',
    backgroundColor: "#D4D4D4",
    marginRight: 40,
  },
  textWithBorder: {
    borderWidth: 1,
    borderColor: '#79CCA4',
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
    width: 350,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#f1f1f1',
    marginLeft: -10,
  },
});

export default MyPageScreen;
