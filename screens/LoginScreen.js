import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_IOS_CLIENT_ID } from '@env';


const LoginScreen = ({ navigation }) => {

  useEffect(() => {
    GoogleSignin.configure({
      include_granted_scopes: false, //권한한번만
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      offlineAccess: false,
    });
  }, []); // 한 번만 호출되도록 useEffect를 사용

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      navigation.replace('Terms'); // 로그인 성공 후 이동할 화면명
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services are not available');
      } else {
        console.log('Google sign-in error', error);
        Alert.alert('Error', 'Failed to sign in with Google');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
        <Image
          source={require('../assets/icon_google.png')}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>구글 계정으로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1FAA67',
  },
  image: {
    width: 168,
    height: 184,
    resizeMode: 'contain',
  },
  button: {
    width: 350,
    height: 48,
    backgroundColor: '#ffffff',
    marginTop: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
  },
});

export default LoginScreen;
