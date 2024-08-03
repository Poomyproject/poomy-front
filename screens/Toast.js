// Toast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../config/colors';


const toastConfig = {
  success: ({ text1 }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText1}>{text1}</Text>
    </View>

  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    marginTop:20,
    height:35,
    width: '73%',
    backgroundColor: colors.Green900,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  toastText1: {
    color: 'white',
    fontSize: 12,
  },
});

const showToast = (type, text1) => {
  Toast.show({
    type,
    text1,
  });
};

export { Toast, showToast, toastConfig };
