import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, item } from 'react-native';
import colors from '../config/colors';
import { fonts } from '../config/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';


const KeywardRecmdScreen = () => {

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
            <View style={{ marginTop: '4%' }}></View>
            <View horizontal={true} style={styles.placeContainer}>
                <TouchableOpacity>
                    <Text style={styles.keywordText}>장소</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keywordText}>모던</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity onPress={toggleModal} style={styles.textInput}>
                <Text>{interestMood || "장소 선택"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.textInput}>
                <Text style={styles.selectText}>{selectedMoods.join(', ') || "분위기 선택"}</Text>
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
                        <Image source={require('../assets/close.png')} style={styles.image} />
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

            <ScrollView>
                <View style={{ flexDirection: 'row', }} >
                    <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                    <View style={{ width: '55%' }}>
                        <Text style={styles.storeName}>샵 이름</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                            <Text style={styles.storeInfo}>카테고리</Text>
                            <View style={{ marginLeft: '3%' }} />
                            <Text style={styles.storeInfo}>위치</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <Image source={require('../assets/map-pin.png')} style={styles.pinImg} />
                            <View style={{ marginLeft: '5%' }} />
                            <Text>주소</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: '13%' }}>
                        <Image source={require('../assets/heart.png')} style={styles.heartImg} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'

    },
    keywordText: {
        alignSelf: 'flex-start',
        padding: 10, // 텍스트 주위의 여백
        paddingHorizontal: 12,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Gray200, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 18, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        marginTop: '2%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: 50,
        // backgroundColor:'black',
        marginLeft: '2%',
    },
    newletter: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginRight: 10,
    },
    searchImg: {
        width: 30,
        height: 30,
    },
    leftarrow: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    searchImg: {
        height: 25,
        width: 25,
        marginLeft: '10%'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 55,
    },
    textInput: {
        height: 50,
        paddingHorizontal: 25, // 입력 내용과 테두리 사이의 여백
        borderRadius: 5,      // 모서리 둥글게 하기
        alignItems: 'center',
        width: '80%',
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    searchButtonText: {
        color: colors.Gray300,
    },
    itemText: {
        padding: 10,
    },
    number: {
        fontSize: 20,
        fontWeight: 1000,
        color: colors.Green900,
        marginLeft: 13,
    },
    serachRankText: {
        fontSize: 15,
        color: colors.Gray300,
        marginLeft: 23,
        marginTop: 1,
    },

    separator: {
        borderBottomWidth: 1, // 선의 두께
        borderColor: colors.Gray100, // 선의 색상
        opacity: 0.7,
        marginHorizontal: 20,
    },

    keywordText: {
        alignSelf: 'flex-start',
        padding: 8, // 텍스트 주위의 여백
        paddingHorizontal: 13,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Gray200, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 16, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: 14,
        marginTop: '2%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: 50,
        // backgroundColor:'black',
        marginLeft: '5%',
        marginTop: '2%'
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
    poomyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Green900,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Gray900,
    },
    storeImg: {
        width: 95,
        height: 95,
        margin: '5%'
    },
    heartImg: {
        width: 23,
        height: 23,
    },
    pinImg: {
        width: 17,
        height: 17,
    },
    storeInfo: {
        alignSelf: 'flex-start',
        padding: 5, // 텍스트 주위의 여백
        paddingHorizontal: 15,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Green500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 13, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        fontSize: 13,
        marginTop: '2%',
    },
    storeName: {
        marginTop: '7%',
        marginLeft: 2,
        fontSize: 16,
        fontWeight: 'bold',

    },
    infoIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
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
  // 여기부터 욘짱
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
})
export default KeywardRecmdScreen;
