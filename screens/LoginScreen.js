import React from 'react';
import { View, Text, Button,StyleSheet, Image, TouchableOpacity} from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Terms')}>
       <Image
       source={require('../assets/icon_google.png')}
       ></Image>
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
    position:'absolute',
    top: 261,
  },

  button: {
    width: 350,
    height: 48,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top:496,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    },
  
    buttonText: {
      color: '#000000',
      fontSize: 15,
      marginLeft:8,
    },
  
});

export default LoginScreen;
