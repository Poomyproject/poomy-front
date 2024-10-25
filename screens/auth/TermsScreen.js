import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 

const TermsScreen = ({ navigation }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  

  const isAllChecked = isChecked1 && isChecked2;

  const handleCheckAll = () => {
    const newValue = !isAllChecked;
    setIsChecked1(newValue);
    setIsChecked2(newValue);
    
  };

  const handleCheck1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheck2 = () => {
    setIsChecked2(!isChecked2);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        시작하기 전,{'\n'}서비스 이용에 동의해주세요.
      </Text>

      <View style = {[styles.boxContainer,{marginVertical:15 , marginTop : -150}]}>
      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheckAll}>
        <View style={[styles.checkBox, isAllChecked && styles.checkedBox]} />
      </TouchableOpacity>
      <Text style={[styles.checkBoxText,{fontFamily:'Pretendard-Semibold'},{fontSize:16}]}>필수 약관 모두 동의</Text>
      </View>

      <View style = {styles.totalContainer}>
      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheck1}>
        <View style={[styles.checkBox, isChecked1 && styles.checkedBox]} />
      </TouchableOpacity>
      <Text style={styles.checkBoxText}>(필수) Pommy(푸미) 이용약관</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TermsDetail1')} style = {{marginLeft:'auto'}}>
          <Image source={require('../../assets/right_black.png')} style={styles.right} />
      </TouchableOpacity>
      </View>

      <View style = {styles.totalContainer}>
      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheck2}>
        <View style={[styles.checkBox, isChecked2 && styles.checkedBox]} />
        <Text style={styles.checkBoxText}>(필수) Pommy(푸미) 개인정보 수집 및 이...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TermsDetail2')} style = {{marginLeft:'auto'}}>
          <Image source={require('../../assets/right_black.png')} style={styles.right} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isAllChecked ? styles.buttonActive : styles.buttonInactive]}
        disabled={!isAllChecked}
        onPress={() => navigation.navigate('Nameset')}
      >
        <Text style={[styles.buttonText, isAllChecked ? styles.buttonTextActive : styles.buttonTextInactive]}>
          다음
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.Ivory100,
  },

  text: {
    color: colors.Black,
    ...fonts.Heading1,
    position: 'absolute',
    top: 150,
    left: 24,
  },

  boxContainer: {
    width: 350, 
    height: 56, 
    borderColor: colors.Gray100,
    borderWidth: 2, 
    borderRadius: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },

  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft : 10,
  },

  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.Gray400,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: colors.Green900, // 체크된 상태의 색상
    borderColor: colors.Green900, // 체크된 상태의 경계 색상
  },
  checkBoxText: {
    ...fonts.Body4,
    color: colors.Gray700
  },

  right:{
    marginLeft: 'auto',
  },

  button: {
    width: 350,
    height: 48,
    backgroundColor: colors.Green900,
    position: 'absolute',
    bottom: 94,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // 둥근 모서리
    },
    
  buttonInactive: {
    backgroundColor: colors.Gray100,
  },
  buttonActive: {
    backgroundColor: colors.Green900,
  },
  buttonText: {
    fontFamily:'Pretendard-Medium',
    fontSize: 15,
  },
  buttonTextActive: {
    color: colors.Ivory100, // 활성화 상태의 버튼 텍스트 색상
  },
  buttonTextInactive: {
    color: colors.Gray500, // 비활성화 상태의 버튼 텍스트 색상
  },
});

export default TermsScreen;
