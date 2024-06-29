import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.container}>이름 님 환영합니다.</Text>
        
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
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
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute', // Absolute positioning
    textAlign: 'left',
    marginTop: 42,
    marginHorizontal: 20,
    },

  details:{
    fontSize : 16,
    color : '#666666',
    fontWeight : '400',
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
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
  },
});

export default WelcomeScreen;
