import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Image, Modal, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../config/colors';
import ShopDetailScreen from '../shop/ShopDetailScreen';
import MainScreen from '../main/MainScreen';

const ShopDetailStack = createStackNavigator();

const ShopNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const shareMessage = async () => {
    try {
      await Share.share({
        message: '공유할 메세지', // 실제 공유할 메시지나 링크를 여기에 입력
      });
    } catch (error) {
      console.error('공유 오류:', error);
    }
  };

  const copyLink = () => {
    const appLink = 'https://example.com/shop/detail'; // 공유할 링크 (여기에 실제 링크 삽입)
    Clipboard.setString(appLink);
    Alert.alert('링크가 복사되었습니다.', '클립보드에 저장되었습니다.');
    toggleModal();
  };

  return (
    <ShopDetailStack.Navigator>
      <ShopDetailStack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <ShopDetailStack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24, marginLeft: 16 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={toggleModal}>
                <Image source={require('../../assets/share.png')} style={{ height: 24, width: 24, marginRight: 16 }} />
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
                    <Text style={styles.modalText}>공유 및 링크 복사</Text>
                    <View style={styles.buttonContainer}>
                      <Pressable style={styles.shareButton} onPress={shareMessage}>
                        <Text style={styles.buttonText}>공유하기</Text>
                      </Pressable>
                      <Pressable style={styles.copyButton} onPress={copyLink}>
                        <Text style={styles.buttonText}>링크 복사</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ),
        })}
      />
    </ShopDetailStack.Navigator>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.Ivory100,
    padding: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: colors.Gray900,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shareButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: colors.Green900,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: colors.Gray200,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.Ivory100,
    fontSize: 16,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default ShopNavigator;
