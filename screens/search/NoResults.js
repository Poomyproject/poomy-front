import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NoResults = () => (
  <View style={styles.noResultsContainer}>
    <Image source={require('../../assets/no_results.png')} style={styles.noResultsImage} />
    <Text style={styles.noResultsText}>검색 결과가 없습니다.</Text>
  </View>
);

const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsImage: {
    width: 200,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  noResultsText: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default NoResults;
