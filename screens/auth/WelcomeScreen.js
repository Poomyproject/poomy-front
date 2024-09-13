import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>약관 디테일1</Text>
      <Text style = {styles.detail}>Poomy(푸미) 이용약관</Text>

      <View style = {styles.termsContainer}>
        <Text style = {styles.termsTitle}>제1장 총칙 {'\n'} {'\n'}  </Text>
        <Text style = {styles.termsTitle}>제1조 (목적) {'\n'} </Text>
        <Text style = {styles.termsDetails}>제1조 (목적) {'\n'} </Text>
        

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Ivory100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  termsContainer : {
    backgroundColor : colors.Gray50,
    marginLeft : 20,
    marginRight : 20,

  },
  termsTitle : {


  },
  termsDetails : {

  }

});

export default WelcomeScreen;