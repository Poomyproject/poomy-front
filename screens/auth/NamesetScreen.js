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
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 여부
  const [isDuplicate, setIsDuplicate] = useState(false); // 중복 여부

  const validateName = (input) => {
    const lengthValid = input.length <= 5 && input.length > 0;
    const contentValid = /^[가-힣]+$/.test(input);

    setIsLengthValid(lengthValid);
    setIsContentValid(contentValid);
    setName(input);
    setIsTouched(true);
    setIsDuplicateChecked(false); // 중복 확인 초기화
  };

  const clearInput = () => {
    setName('');
    setIsLengthValid(false);
    setIsContentValid(false);
    setIsTouched(false);
    setIsDuplicateChecked(false); // 중복 확인 초기화
  };

  const checkDuplicate = async () => {
    try {
      // 서버로 닉네임 중복 확인 요청
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
      Alert.alert('오류', '닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const submitNickname = async () => {
    try {
      const data = { nickname: name }; // 서버에 보낼 데이터 형식
      console.log('Data being sent to server:', data); // 확인용 로그

      // 서버로 POST 요청
      const response = await ApiClient.post('/api/users/nickname', data);

      // 서버 응답 확인
      if (response.data.success) {
        console.log('Nickname submitted successfully:', response.data);
        navigation.navigate('PreferSelect'); // 성공 시 다음 화면으로 이동
      } else {
        console.error('Error:', response.data);
        Alert.alert('Error', 'Failed to submit nickname');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      }
      Alert.alert('Error', 'An error occurred while submitting the nickname.');
    }
  };

  const isAllChecked = isLengthValid && isContentValid && isDuplicateChecked && !isDuplicate;

  const getIcon = (valid) => {
    if (!isTouched) return require('../../assets/check_gray.png');
    return valid ? require('../../assets/check_green.png') : require('../../assets/check_red.png');
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
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              !isTouched ? styles.default : (isLengthValid && isContentValid ? styles.valid : styles.invalid),
            ]}
            value={name}
            onChangeText={validateName}
            placeholder="5자 이내로 입력해 주세요"
            placeholderTextColor={!isTouched ? colors.Gray400 : (isLengthValid && isContentValid ? colors.Gray400: colors.Gray400)}
            onBlur={() => setIsTouched(true)}
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
              <Image source={require('../../assets/x.png')} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
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

        {/* 닉네임 중복 확인 버튼 */}
        <TouchableOpacity 
          style={styles.duplicateCheckButton}
          onPress={checkDuplicate}
        >
          <Text style={styles.duplicateCheckButtonText}>닉네임 중복 확인</Text>
        </TouchableOpacity>

        {/* 닉네임 중복 확인 결과 */}
        {isDuplicateChecked && (
          <View style={styles.validationContainer}>
            <Image source={getIcon(!isDuplicate)} style={styles.icon} />
            <Text style={[
              styles.validationText,
              isDuplicate ? styles.invalidText : styles.validText, // 중복 확인 시 초록색 텍스트로 변경
            ]}>
              {isDuplicate ? '이미 사용 중인 닉네임입니다.' : '사용 가능한 닉네임입니다.'}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isAllChecked ? styles.buttonActive : styles.buttonInactive]}
          disabled={!isAllChecked}
          onPress={submitNickname} // 닉네임 제출
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
    backgroundColor:colors.Ivory100,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.Gray300,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "500"
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    width: 24,
    height: 24,
  },
  default: {
    borderBottomColor: colors.Gray400,
  },
  valid: {
    borderBottomColor: colors.Green900,
  },
  invalid: {
    borderBottomColor: colors.Error,
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
    ...fonts.Body4,
  },
  validText: {
    color: colors.Green900,
    ...fonts.Body4,
  },
  invalidText: {
    color: colors.Error,
    ...fonts.Body4,
  },
  duplicateCheckButton: {
    backgroundColor: colors.Green900,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  duplicateCheckButtonText: {
    color: colors.Ivory100,
    fontSize: 15,
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
