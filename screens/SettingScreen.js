import React, { useState } from 'react';
import { View, Text, StyleSheet , Switch, TouchableOpacity, Image  } from 'react-native';
import colors from '../config/colors';
import { fonts } from '../config/fonts'; 



const SettingScreen = () => {

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotificationSwitch = () => {
    setIsNotificationEnabled(previousState => !previousState);
    handleNotificationToggle(!isNotificationEnabled);
  };

  const handleNotificationToggle = (isEnabled) => {
    if (isEnabled) {
      // 알림 켜기 로직
      console.log('Notifications enabled');
    } else {
      // 알림 끄기 로직
      console.log('Notifications disabled');
    }
  }

  return (
    <View style={styles.container}>

      <View style = {styles.textBox}>
        <Text style = {styles.detail}>알림설정</Text>
      <View style={styles.notificationBox}>
          <Text style={styles.buttonText}>알림 설정 ON/OFF</Text>
          <Switch
            trackColor={{ false: colors.Gray200, true: colors.Green900 }}
            thumbColor={isNotificationEnabled ? colors.Ivory100 : colors.Gray500}
            onValueChange={toggleNotificationSwitch}  // 스위치 상태를 변경
            value={isNotificationEnabled}  // 스위치 상태
          />
      </View>
      <View style={styles.line}></View>
      <View>
      </View>
      <View style = {styles.textBox}>
        <Text style = {styles.detail}>이용 약관</Text>
      <View style={[{ marginTop: 0 }]}>
            <TouchableOpacity style={styles.buttonBox}>
              <Text style={styles.buttonText}>Poomy 이용약관</Text>
              <Image source={require('../assets/right_black.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>  
          <View>
            <TouchableOpacity style={styles.buttonBox}>
              <Text style={styles.buttonText}>개인정보 수집 및 이용에 대한 동의</Text>
              <Image source={require('../assets/right_black.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View>  
          <View style={[{ marginTop: 0 }]}>
            <TouchableOpacity style={styles.buttonBox}>
              <Text style={styles.buttonText}>위치정보 이용동의 및 위치기반서비스 이용약관</Text>
              <Image source={require('../assets/right_black.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <View style={styles.line}></View>
          </View> 
          </View>
          <View style={[{ marginTop: 50 }]}>
          <Text style = {styles.detail}>앱 버전</Text>
            <View style={styles.buttonBox}>
              <Text style={styles.buttonText}>현재 버전</Text>
              <Text style={styles.detail}>1.0.0</Text>
            </View>
          </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'Top',
    alignItems: 'center',
    backgroundColor: colors.Ivory100,
  },

  textBox : {
    flexDirection: 'column',
    marginTop : 50,
    width: 380,
  },

  detail : {
    ...fonts.Body4,
    color: colors.Gray400,
    padding: 10,
  },
  
  notificationBox : {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    padding: 10,
    width: 380,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 380,
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
    backgroundColor: colors.Gray100,
    marginLeft: -10,
  },
});

export default SettingScreen;
