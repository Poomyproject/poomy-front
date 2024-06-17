import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TermsScreen = ({ navigation }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const isAllChecked = isChecked1 && isChecked2 && isChecked3;

  const handleCheckAll = () => {
    const newValue = !isAllChecked;
    setIsChecked1(newValue);
    setIsChecked2(newValue);
    setIsChecked3(newValue);
  };

  const handleCheck1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheck2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCheck3 = () => {
    setIsChecked3(!isChecked3);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        시작하기 전,{'\n'}서비스 이용에 동의해주세요.
      </Text>

      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheckAll}>
        <View style={[styles.checkBox, isAllChecked && styles.checkedBox]} />
        <Text style={styles.checkBoxText}>필수약관 모두 동의</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheck1}>
        <View style={[styles.checkBox, isChecked1 && styles.checkedBox]} />
        <Text style={styles.checkBoxText}>(필수)Pommy(푸미) 이용약관</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheck2}>
        <View style={[styles.checkBox, isChecked2 && styles.checkedBox]} />
        <Text style={styles.checkBoxText}>(필수)Pommy(푸미) 개인정보 수집 및 이...</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkBoxContainer} onPress={handleCheck3}>
        <View style={[styles.checkBox, isChecked3 && styles.checkedBox]} />
        <Text style={styles.checkBoxText}>(필수)위치정보 이용동의 및 위치기반서비...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isAllChecked ? styles.buttonActive : styles.buttonInactive]}
        disabled={!isAllChecked}
        onPress={() => navigation.navigate('Nameset')}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create = ({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#000000',
    fontSize: 24,
    position: 'absolute',
    top: 150,
    left: 24,
    fontWeight: 'bold',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#1FAA67', // 체크된 상태의 색상
    borderColor: '#1FAA67', // 체크된 상태의 경계 색상
  },
  checkBoxText: {
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonInactive: {
    backgroundColor: '#ccc',
  },
  buttonActive: {
    backgroundColor: '#1FAA67',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsScreen;
