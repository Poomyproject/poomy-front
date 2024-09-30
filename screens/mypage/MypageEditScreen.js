import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import Modal from 'react-native-modal';

const MypageEditScreen = () => {
  const [nickname, setNickname] = useState('초기 닉넴'); // 닉네임 상태 관리
  const [email, setEmail] = useState('asdfasdf@gmail.com'); // 이메일 상태 관리
  const [interestPlace, setInterestPlace] = useState(''); // 관심 장소 상태 관리
  const [interestMood, setInterestMood] = useState(''); // 관심 분위기 상태 관리
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood)); // 선택 해제
    } else if (selectedMoods.length < 2) {
      setSelectedMoods([...selectedMoods, mood]); // 새로운 항목 추가
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/defualt.png')} style={styles.profileImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.textColor}>닉네임</Text>
        <TextInput
          style={styles.textInput}
          value={nickname}
          onChangeText={setNickname}
        />
        <Text style={styles.textColor}>계정정보</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.textColor}>관심장소</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.textInput}>
          <Text>{interestMood || "분위기 선택"}</Text>
        </TouchableOpacity>

        <Text style={styles.textColor}>관심분위기</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.textInput}>
          <Text style = {styles.selectText}>{selectedMoods.join(', ') || "분위기 선택"}</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          swipeDirection="down"
          style={styles.bottomModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContent}>
          <View style={styles.textContainer}>
          <Text style={styles.text}>분위기</Text>
          <Image source={require('../../assets/close.png')} style={styles.image} />
          </View>
          <View style={styles.moodContainer}>
            {['코지', '럭셔리', '모던', '아기자기한', '빈티지', '테마별'].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[styles.moodButton, selectedMoods.includes(mood) ? styles.selectedMood : {}]}
                onPress={() => handleSelectMood(mood)}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </TouchableOpacity>
            ))}
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Ivory100,
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%', // 내용을 감싸는 컨테이너의 폭을 설정
    alignItems: 'flex-start', // 모든 항목을 세로 중앙에 위치
  },
  profileImage: {
    width: 110,
    height: 110,
    marginTop: 35,
    justifyContent: 'center',
  },
  textColor: {
    color: colors.Gray300,
    ...fonts.Body4,
    marginTop: 35,
  },

  textInput: {
    height: 50,
    width: '100%',
    borderColor: colors.Gray300,
    borderWidth: 1,
    backgroundColor: colors.Gray100,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 8,
    ...fonts.Body2,
    justifyContent: 'left',
  },

  selectText : {
    borderWidth: 1,
    borderColor: colors.Green500,
    padding: 6,
    margin: 5,
    borderRadius: 16,
    fontSize: 12,
    flex: 1
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalContent: {
    backgroundColor: colors.Ivory100,
    marginTop : 20 , 
    padding: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
  },

  textContainer: {
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
  },

  text: {
    flex: 1,
    ...fonts.Body1,
  },

  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },

  moodButton: {
    borderWidth: 1,
    borderColor: colors.Gray100,
    padding: 10,
    marginRight : 10,
    borderRadius: 20,
    marginTop: 10,
  },

  selectStyle: {
    borderWidth: 1,
    borderColor: colors.Green500,
    padding: 6,
    margin: 5,
    borderRadius: 16,
    fontSize: 12,
    Color : colors.Ivory100,
  },
  
  buttonText: {
    color: '#000',
    fontSize: 16,
  },

  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    marginRight : 100,
  },
  
  selectedMood: {
    backgroundColor: colors.Green900,
  },

  moodText: {
    fontSize: 16,
    color: colors.Gray900,
  },

  closeButton: {
   width: 350,
   height: 48,
   backgroundColor: colors.Green900,
   alignSelf: 'center',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 8,
   marginTop : 110, 
   marginBottom : 20, 
  },

  closeButtonText: {
   color: colors.Ivory100,
   fontSize: 15,
  },
});

export default MypageEditScreen;
