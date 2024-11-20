import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient from './ApiClient';

const NamesetScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const validateName = (input) => {
    const lengthValid = input.length <= 5 && input.length > 0;
    const contentValid = /^[가-힣]+$/.test(input);

    setIsLengthValid(lengthValid);
    setIsContentValid(contentValid);
    setName(input);
    setIsTouched(true);
    setIsDuplicateChecked(false);
  };

  const clearInput = () => {
    setName('');
    setIsLengthValid(false);
    setIsContentValid(false);
    setIsTouched(false);
    setIsDuplicateChecked(false);
  };

  const checkDuplicate = async () => {
    try {
      const response = await ApiClient.post('/api/users/check/nickname', { nickname: name });
      if (response.data.isDuplicate) {
        setIsDuplicate(true);
        Alert.alert('중복된 닉네임', '이미 사용 중인 닉네임입니다.');
      } else {
        setIsDuplicate(false);
        Alert.alert('사용 가능한 닉네임', '해당 닉네임을 사용할 수 있습니다.');
      }
      setIsDuplicateChecked(true);
    } catch (error) {
      console.error('Error during nickname check:', error);
      Alert.alert('오류', '닉네임을 설정할 수 없습니다.');
    }
  };

  const isAllChecked = isLengthValid && isContentValid && isDuplicateChecked && !isDuplicate;

  const getIcon = (valid) => {
    if (!isTouched) return require('../../assets/check_gray.png');
    return valid ? require('../../assets/check_green.png') : require('../../assets/check_red.png');
  };

  const getIcon2 = (valid, isChecked) => {
    if (!isChecked) {
      return require('../../assets/check_gray.png');
    }
    return valid ? require('../../assets/check_green.png') : require('../../assets/check_red.png');
  };
  
  const handleSaveNickname = async () => {
    try {
      const response = await ApiClient.post('/api/users/nickname', { nickname: name });
      if (response.data.success) {
        navigation.navigate('PreferSelect');
      } else {
        Alert.alert('오류', '닉네임을 다시 설정해주세요');
      }
    } catch (error) {
      console.error('Error during nickname submission:', error);
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={require('../../assets/progress_bar.png')} style={styles.image} />
        <Text style={styles.text}>사용하실 이름을 {'\n'}입력해주세요.</Text>

        <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, isTouched ? (isLengthValid && isContentValid ? styles.validBorder : styles.invalidBorder) : styles.defaultBorder]}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={validateName}
            placeholder="5자 이내로 입력해 주세요"
            placeholderTextColor={colors.Gray400}
            onBlur={() => setIsTouched(true)}
          />
        </View>
        <TouchableOpacity 
          style={styles.duplicateCheckButton}
          onPress={checkDuplicate}
        >
          <Text style={styles.duplicateCheckButtonText}>중복확인</Text>
        </TouchableOpacity>
        </View>
          

        <View style={styles.validationContainer}>
          <Image source={getIcon(isLengthValid)} style={styles.icon} />
          <Text style={[
            styles.validationText,
            !isTouched ? styles.defaultText : (isLengthValid ? styles.validText : styles.invalidText),
          ]}>
            한글 최대 5자
          </Text>
        </View>
        <View style={styles.validationContainer}>
          <Image source={getIcon(isContentValid)} style={styles.icon} />
          <Text style={[
            styles.validationText,
            !isTouched ? styles.defaultText : (isContentValid ? styles.validText : styles.invalidText),
          ]}>
            공백, 쉼표, 숫자, 특수기호 불가
          </Text>
        </View>

        <View style={styles.validationContainer}>
          <Image source={getIcon2(!isDuplicate, isDuplicateChecked)} style={styles.icon} />
          <Text style={[
            styles.validationText,
            !isDuplicateChecked ? styles.defaultText : (isDuplicate ? styles.duplicateInvalidText : styles.duplicateValidText),
          ]}>
            {!isDuplicateChecked ? '닉네임 중복확인을 해주세요' : (isDuplicate ? '이미 사용 중인 닉네임입니다.' : '사용 가능한 닉네임입니다.')}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isAllChecked ? styles.buttonActive : styles.buttonInactive]}
          disabled={!isAllChecked}
          onPress={handleSaveNickname}
        >
          <Text style={[styles.buttonText, isAllChecked ? styles.buttonTextActive : styles.buttonTextInactive]}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.Ivory100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: -10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 48,
    height: 8,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    ...fonts.Heading1,
    textAlign: 'left',
    marginBottom: 40,
  },
  rowContainer: {
    flexDirection: 'row', // 가로 정렬
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1, // 입력창이 버튼을 제외한 나머지 공간 차지
    backgroundColor: colors.Ivory300,
  },
  input: {
    height: 38,
    ...fonts.Body2,
    color: colors.Gray900,
    paddingHorizontal: 10,
  },
  duplicateCheckButton: {
    marginLeft: 10,
    paddingVertical: 17,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: colors.Gray300,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Ivory100,
  },
  duplicateCheckButtonText: {
    color: colors.Gray300,
    fontSize: 15,
  },
  defaultBorder: {
    borderColor: colors.Gray300,
    borderWidth: 1,
  },
  validBorder: {
    borderColor: colors.Green900,
    borderWidth: 1,
  },
  invalidBorder: {
    borderColor: colors.Error,
    borderWidth: 1,
  },
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 10,
  },
  validationText: {
    fontSize: 14,
    ...fonts.Body4,
  },
  defaultText: {
    color: colors.Gray400,
  },
  validText: {
    color: colors.Green900,
  },
  invalidText: {
    color: colors.Error,
  },
  duplicateValidText: {
    color: colors.Green900,
  },
  duplicateInvalidText: {
    color: colors.Error,
  },
  button: {
    width: 350,
    height: 48,
    position: 'absolute',
    bottom: 94,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonInactive: {
    backgroundColor: colors.Gray100,
  },
  buttonActive: {
    backgroundColor: colors.Green900,
  },
  buttonText: {
    fontSize: 15,
  },
  buttonTextActive: {
    color: colors.Ivory100,
  },
  buttonTextInactive: {
    color: colors.Gray500,
  },
});

export default NamesetScreen;
