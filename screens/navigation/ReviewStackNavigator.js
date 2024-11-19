import React from 'react';
import { View, TouchableOpacity, Image, Modal, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import UserReviewScreen1 from '../review/UserReviewScreen1';
import UserReviewScreen2 from '../review/UserReviewScreen2';
import UserReviewScreen3 from '../review/UserReviewScreen3';
import UserReviewScreen4 from '../review/UserReviewScreen4';
import ShopReviewScreen from '../shop/ShopReviewScreen';
import ShopDetailScreen from '../shop/ShopDetailScreen';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';



const ReviewStack = createStackNavigator();

const ReviewStackNavigator = () => (
  <ReviewStack.Navigator>
    <ReviewStack.Screen 
      name="UserReview1" 
      component={UserReviewScreen1} 
      options={({ navigation }) => ({
        headerTitle: '리뷰 작성하기',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left.png')} style={{ marginLeft: 10, height: 24, width: 24 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.Ivory100 },
        headerTintColor: colors.Gray900,
        ...fonts.Body1
      })}
    />
    <ReviewStack.Screen 
      name="UserReview2" 
      component={UserReviewScreen2} 
      options={({ navigation }) => ({
        headerTitle: '리뷰 작성하기',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left.png')} style={{ marginLeft: 10, height: 24, width: 24 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.Ivory100 },
        headerTintColor: colors.Gray900,
        ...fonts.Body1
      })}
    />
    <ReviewStack.Screen 
      name="UserReview3" 
      component={UserReviewScreen3} 
      options={({ navigation }) => ({
        headerTitle: '리뷰 작성하기',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left.png')} style={{ marginLeft: 10, height: 24, width: 24 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.Ivory100 },
        headerTintColor: colors.Gray900,
        ...fonts.Body1
      })}
    />
    <ReviewStack.Screen 
      name="UserReview4" 
      component={UserReviewScreen4} 
      options={({ navigation }) => ({
        headerTitle: '리뷰 작성하기',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left.png')} style={{ marginLeft: 10, height: 24, width: 24 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.Ivory100 },
        headerTintColor: colors.Gray900,
        ...fonts.Body1
      })}
    />
    <ReviewStack.Screen 
      name="ShopReview" 
      component={ShopReviewScreen} 
      options={({ navigation }) => ({
        headerTitle: '리뷰',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('ShopDetail')}>
            <Image source={require('../../assets/left.png')} style={{ marginLeft: 10, height: 24, width: 24 }} />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.Ivory100 },
        headerTintColor: colors.Gray900,
        ...fonts.Body1
      })}
    />
    <ReviewStack.Screen
      name="ShopDetail"
      component={ShopDetailScreen}
      options={({ navigation }) => ({
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24, marginLeft: 16, }} />
          </TouchableOpacity>
        ),
        // headerRight: () => (
        //   <View>
        //     <TouchableOpacity onPress={toggleModal}>
        //       <Image source={require('../../assets/share.png')} style={{ height: 24, width: 24, marginRight: 16, }} />
        //     </TouchableOpacity>
        //     {/* <Modal
        //       swipeDirection="down"
        //       animationType="slide"
        //       style={styles.bottomModal}
        //       transparent={true}
        //       visible={isModalVisible}
        //       animationIn="slideInUp"
        //       animationOut="slideOutDown"
        //     >
        //       <View style={styles.modalBackground}>
        //         <View style={styles.modalContent}>
        //           <Text>모달 창입니다!</Text>
        //           <Button title="닫기" onPress={toggleModal} />
        //         </View>
        //       </View>
        //     </Modal> */}

        //   </View>
        // ),
      })} />
  </ReviewStack.Navigator>
);



export default ReviewStackNavigator;

