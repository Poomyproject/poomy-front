import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const NamesetScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const validateName = (input) => {
    const lengthValid = input.length <= 5 && input.length > 0;
    const contentValid = /^[가-힣]+$/.test(input);

    setIsLengthValid(lengthValid);
    setIsContentValid(contentValid);
    setName(input);
    setIsTouched(true);
  };

  const clearInput = () => {
    setName('');
    setIsLengthValid(false);
    setIsContentValid(false);
    setIsTouched(false);
  };

  const isAllChecked = isLengthValid && isContentValid;

  const getIcon = (valid) => {
    if (!isTouched) return require('../assets/check_gray.png');
    return valid ? require('../assets/check_green.png') : require('../assets/check_red.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={require('../assets/progress_bar.png')} style={styles.image}></Image>
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
            placeholderTextColor="gray"
            onBlur={() => setIsTouched(true)}
          />
          {name.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
              <Image source={require('../assets/x.png')} style={styles.clearIcon} />
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
        <TouchableOpacity
          style={[styles.button, isAllChecked ? styles.buttonActive : styles.buttonInactive]}
          disabled={!isAllChecked}
          onPress={() => navigation.navigate('PreferSelect')}
        >
          <Text style={styles.buttonText}>다음</Text>
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
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 40,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
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
    borderBottomColor: 'gray',
  },
  valid: {
    borderBottomColor: 'green',
  },
  invalid: {
    borderBottomColor: 'red',
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
  },
  defaultText: {
    color: 'gray',
  },
  validText: {
    color: 'green',
  },
  invalidText: {
    color: 'red',
  },

  button: {
    width: 350,
    height: 48,
    backgroundColor: '#1FAA67',
    position: 'absolute',
    bottom: 94,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // 둥근 모서리
    },
    
  buttonInactive: {
    backgroundColor: '#ccc',
  },
  buttonActive: {
    backgroundColor: '#1FAA67',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
  },
});

export default NamesetScreen;
