import React from 'react';
import { View, Text, Image , StyleSheet, Button, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.profile}>
      <Image source = {require('../assets/profile.png')}>
      </Image>
      <Text style = {styles.profileText}> 이름님,{'\n'} 행운을 빌어요!</Text>
      </View>

      <View style={styles.preferBox}>
        <Image source={require('../assets/mappin.png')}></Image>
          <Text style={styles.preferText}>관심장소</Text>
          <View style={styles.verticalLine}></View>
      <Text style={styles.textWithBorder}>#이태원</Text>
      <Text style={styles.textWithBorder}>#혜화/대학로</Text>
        <View>
        </View>
      </View>

      <View>
        <View>
        <TouchableOpacity style = {styles.buttonBox}>
          <Text style = {styles.buttonText}>환경설정</Text>
          <Image source={require('../assets/right.png')} style = {styles.buttonImage}></Image>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style = {styles.buttonBox}>
          <Text style = {styles.buttonText}>공지사항</Text>
          <Image source={require('../assets/right.png')} style = {styles.buttonImage}></Image>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonBox}>
          <Text style = {styles.buttonText}>문의사항</Text>
          <Image source={require('../assets/right.png')} style = {styles.buttonImage}></Image>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonBox}>
          <Text style = {styles.buttonText}>로그아웃</Text>
          <Image source={require('../assets/right.png')} style = {styles.buttonImage}></Image>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonBox}>
          <Text style = {styles.buttonText}>탈퇴</Text>
          <Image source={require('../assets/right.png')} style = {styles.buttonImage}></Image>
        </TouchableOpacity>
      </View>
    </View>
    
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  profile: {
    flex : 0.2,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText:{
    flex : 1,
    justifyContent: 'center',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '600',
    alignItems: 'center',

  },
  preferBox:{
    flex : 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, 
  },
  preferText:{
    flex : 1,
    fontSize : 16,
    fontWeight : 200,
    color: 666666,
    marginLeft : 5,
  },

  verticalLine: {
    width: 1.5,
    height: '15%',
    backgroundColor:666666,
    marginRight: 80, 
  
  },
  textWithBorder: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5, // Adjust as needed
    margin: 5, // Adjust as needed
  },

  buttonBox: {
    flexDirection: 'row',       // 수평 방향으로 정렬
    justifyContent: 'space-between', // 좌우 끝에 요소를 배치
    alignItems: 'center',       // 수직 중앙 정렬
    padding: 10,
    width: 350,                 // 버튼 너비 (필요에 따라 변경)
  },
  buttonText: {
    fontSize: 16,
  },
  buttonImage: {
    width: 20,                  // 이미지 너비
    height: 20,                 // 이미지 높이
    marginLeft: 10,             // 텍스트와 이미지 사이 간격
  },
});

export default MyPageScreen;
