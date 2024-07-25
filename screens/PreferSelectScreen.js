import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import { fonts } from '../config/fonts'; 


const PreferSelectScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <Image source={require('../assets/progress_bar1.png')} style={styles.image}></Image>
        <Text style={styles.text}>당신의 취향을 선택해 주세요</Text>
        <Text style={styles.details}>당신의 소품샵 취향은 무엇인가요? (최대 2개)</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreferPlace')}
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
    fontFamily : 'Pretendard-Medium',
    backgroundColor : colors.Ivory100,
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
    marginBottom: 10,
  },

  details:{
    fontSize : 16,
    color : colors.Gray700,
    ...fonts.Body2,
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
  buttonText: {
    color: colors.Ivory100,
    fontSize: 15,
    fontFamily : 'Pretendard-Medium',
  },
});

export default PreferSelectScreen;
