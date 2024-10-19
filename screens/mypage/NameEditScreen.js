import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert , Image } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import ApiClient from '../auth/ApiClient';

const NameEditScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveNickname}>
          <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
        </TouchableOpacity>
      ),
    });
  }, [name]);

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
      Alert.alert('오류', '닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSaveNickname = async () => {
    try {
      const response = await ApiClient.post('/api/users/nickname', { nickname: name });
      if (response.data.success) {
        console.log('Nickname saved successfully');
        navigation.goBack(); // 저장 후 이전 화면으로 이동
      } else {
        console.error('Error saving nickname');
      }
    } catch (error) {
      console.error('Error during nickname save:', error);
    }
  };

   // 클라이언트 내 상태 저장
   const handleSaveNicknameLocally = () => {
    // 로컬 상태 저장 후 이전 페이지로 닉네임을 전달
    navigation.navigate('MypageEdit', { nickname });
  };

  const isAllChecked = isLengthValid && isContentValid && isDuplicateChecked && !isDuplicate;

  const getIcon = (valid) => {
    if (!isTouched) return require('../../assets/check_gray.png');
    return valid ? require('../../assets/check_green.png') : require('../../assets/check_red.png');
  };

  const getIcon2 = (valid, isChecked) => {
    if (!isChecked) return require('../../assets/check_gray.png');
    return valid ? require('../../assets/check_green.png') : require('../../assets/check_red.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            !isTouched ? styles.default : (isLengthValid && isContentValid ? styles.valid : styles.invalid),
          ]}
          value={name}
          onChangeText={validateName}
          placeholder="5자 이내로 입력해 주세요"
          placeholderTextColor={isTouched ? colors.Gray400 : colors.Gray400}
          onBlur={() => setIsTouched(true)}
        />

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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.Gray300,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  duplicateCheckButton: {
    borderColor: colors.Gray200,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: colors.Gray900,
    alignItems: 'center',
    marginLeft: 10,
  },
  duplicateCheckButtonText: {
    color: colors.Gray900,
    fontSize: 15,
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
});

export default NameEditScreen;
