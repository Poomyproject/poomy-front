import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import colors from '../../config/colors';
import styles from './styles';

const SearchResultScreen = ({navigation}) => {
  return (
<View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: "3%" }}>
                    <Image source={require('../../assets/top_bar.png')} style={styles.leftArrow} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="내가 찾는 소품샵 이름을 검색해보세요."
                />
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Image 
                    source={require('../../assets/86-close.png')} 
                    style={styles.searchImg} />
                </TouchableOpacity>
            </View>
        </View>
  );
};


export default SearchResultScreen;
