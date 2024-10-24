import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Image, Modal, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import ShopDetailScreen from '../shop/ShopDetailScreen';
import MainScreen from '../main/MainScreen';

const ShopDetailStack = createStackNavigator();

const ShopNavigatior = () => {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    return(
        <ShopDetailStack.Navigator>
        <ShopDetailStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <ShopDetailStack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 , marginLeft:16,}} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
            <TouchableOpacity onPress={toggleModal}>
            <Image source={require('../../assets/share.png')} style={{ height: 24, width: 24 , marginRight:16,}} />
            </TouchableOpacity>
            <Modal
            swipeDirection="down"
            animationType="slide"
            style={styles.bottomModal}
            transparent={true}
            visible={isModalVisible} 
            animationIn="slideInUp"
            animationOut="slideOutDown"
            >
          <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>모달 창입니다!</Text>
            <Button title="닫기" onPress={toggleModal} />
          </View>
        </View>
      </Modal>


            </View>
          ),
        })}
      />
        </ShopDetailStack.Navigator>
    )


};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 모달 외부의 반투명 배경
  },
  modalContent: {
    backgroundColor: colors.Ivory100,
    marginTop : 20 , 
    padding: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

});

export default ShopNavigatior;