
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // 아이콘 사용
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 


const ShopDetailScreen = () => {


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/photo.png')}></Image>
            <View style={styles.header}>
        <Text style={styles.shopName}>선민이네 샵</Text>
        <TouchableOpacity>
          <Image source={require('../../assets/heart.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
            <Image source={require('../../assets/clock.png')} style={styles.icon}/>
          <Text style={styles.infoText}>09:00 - 15:00</Text>
        </View>
        <View style={styles.infoRow}>
        <Image source={require('../../assets/phone.png')} style={styles.icon}/>
          <Text style={styles.infoText}>000-0000-0000</Text>
        </View>
        <View style={styles.infoRow}>
        <Image source={require('../../assets/map-pin_gray.png')} style={styles.icon}/>
          <Text style={styles.infoText}>서울시 용산구 | 이태원역 1번 출구 9분</Text>
        </View>
      </View>
      <Image source = {require('../../assets/img_map.png')} style ={{marginTop: 10}}></Image>
      <View style={styles.header}>
        <Text style = {styles.shopName}>리뷰</Text>
        <Image source={require('../../assets/edit.png')} style={{ alignItems: 'left', marginLeft: 230 }}></Image>
        <Text style = {styles.infoText}>작성하기</Text>
        </View>
        <View style = {styles.review}>
        <Text style = {styles.shopName}>13명의 추천을 받은 소품샵이에요</Text>
        </View>
        

  
      

        </View>
    );

 };

 const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : 10, 
        alignItems : 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight : 25,
        width: 380,
        marginBottom: 10,
        marginTop : 10,
      },
      icon: {
        width: 20, 
        height: 20, 
        resizeMode: 'contain', // 이미지의 크기 조정 모드
      },
      shopName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5A4E4E', // 텍스트 색상
      },
      infoContainer: {
        marginTop: 10,
        alignItems: 'left',
        marginLeft : -90 , 
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      infoText: {
        fontSize: 14,
        color: colors.Gray700,
        ...fonts.Body4,
        marginLeft: 8,
      },
      review : {
        marginTop: 10,
        alignItems: 'left',
        alignItems: 'left',
      },
    
 })

export default ShopDetailScreen;