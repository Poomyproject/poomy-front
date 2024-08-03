import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity, Image  } from 'react-native';
import colors from '../config/colors';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <View>
      <View style={[{ marginTop: -40 }]}>
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
          <View style={[{ marginTop: -40 }]}>
            <TouchableOpacity style={styles.buttonBox}>
              <Text style={styles.buttonText}>위치정보 이용동의 및 위치기반서비스 이용약관</Text>
              <Image source={require('../assets/right_black.png')} style={styles.buttonImage} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Ivory100,
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
