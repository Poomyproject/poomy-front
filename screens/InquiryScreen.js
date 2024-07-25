import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

const InquiryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>문의사항 화면</Text>
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
});

export default InquiryScreen;
