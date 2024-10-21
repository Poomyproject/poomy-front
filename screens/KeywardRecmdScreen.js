import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, item } from 'react-native';
import colors from '../config/colors';
import { fonts } from '../config/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';


const KeywardRecmdScreen = () => {

    const [interestPlace, setInterestPlace] = useState(''); // 장소 상태 관리
    const [interestMood, setInterestMood] = useState(''); // 분위기 상태 관리
    const [isModalVisible, setModalVisible] = useState(false); // 모달 상태 관리
    const [selectedMood, setSelectedMood] = useState(''); // 선택된 분위기 (하나만 선택)
    const [isSelectingPlace, setIsSelectingPlace] = useState(false); // 장소 선택 모달인지 분위기 선택 모달인지

    // 장소와 분위기 목록
    const moodOptions = ['코지', '럭셔리', '모던', '아기자기', '빈티지', '테마별'];
    const placeOptions = ['강남', '명동', '북촌한옥마을', '성수', '송리단길', '영등포', '이태원', '종로', '혜화', '홍대'];

    // 모달 열기/닫기 토글
    const toggleModal = (isPlace = false) => {
        setIsSelectingPlace(isPlace);
        setModalVisible(!isModalVisible);
    };

    // 항목 선택 처리 (하나만 선택 가능)
    const handleSelectOption = (option) => {
        if (selectedMood === option) {
            setSelectedMood(''); // 이미 선택된 항목을 다시 누르면 선택 해제
        } else {
            setSelectedMood(option); // 새로운 항목을 선택
        }
    };

    // 적용하기 버튼 클릭 시 선택한 내용 반영
    const applySelection = () => {
        if (isSelectingPlace && selectedMood) {
            setInterestPlace(selectedMood); // 선택된 항목을 장소로 설정
        } else if (!isSelectingPlace && selectedMood) {
            setInterestMood(selectedMood); // 선택된 항목을 분위기로 설정
        }
        setSelectedMood(''); // 선택된 항목 초기화
        setModalVisible(false); // 모달 닫기
    };

    return (
        <ScrollView style={styles.container}>


            <View style={styles.buttoncontainer}>
                {/* 장소 버튼 */}
                <TouchableOpacity
                    onPress={() => toggleModal(true)}
                    style={[styles.textInput, interestPlace ? styles.selectedButton : {}]}
                >
                    <Text style={interestPlace ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestPlace || "장소"}
                    </Text>
                    {interestPlace ? (
                        <TouchableOpacity onPress={() => setInterestPlace(null)}>
                            <Image source={require('../assets/85-close.png')} style={styles.close} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../assets/down.png')} style={styles.down} />
                    )}
                </TouchableOpacity>


                <View style={{ marginLeft: 10, }} />

                {/* 분위기 버튼 */}
                <TouchableOpacity
                    onPress={() => toggleModal(false)}
                    style={[styles.textInput, interestMood ? styles.selectedButton : {}]}
                >
                    <Text style={interestMood ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestMood || "분위기"}
                    </Text>
                    {interestMood ? (
                        <TouchableOpacity onPress={() => setInterestMood(null)}>
                            <Image source={require('../assets/85-close.png')} style={styles.close} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../assets/down.png')} style={styles.down} />
                    )}
                </TouchableOpacity>

            </View>



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
                        <Text style={styles.text}>{isSelectingPlace ? "장소" : "분위기"}</Text>
                        <Image source={require('../assets/close.png')} style={styles.image} />
                    </View>
                    <View style={styles.moodContainer}>
                        {(isSelectingPlace ? placeOptions : moodOptions).map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.moodButton, selectedMood === option ? styles.selectedMood : {}]}
                                onPress={() => handleSelectOption(option)}
                            >
                                <Text style={styles.moodText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={applySelection} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>적용하기</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
        </ScrollView>
    );



};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    down: {
        width: 14,
        height: 8,
        marginLeft: 6,
    },
    close: {
        width: 20,
        height: 20,
        marginLeft: 6,
    },
    buttoncontainer: {
        flexDirection: 'row',
        // alignItems: 'center', // 수직 정렬 (필요에 따라 변경 가능)
        // justifyContent: 'flex-start', // 왼쪽 정렬
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

    // 선택하기 전 button
    textInput: {
        flexDirection: 'row',
        height: 35,
        paddingHorizontal: 15, // 입력 내용과 테두리 사이의 여백
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.Gray200,
        alignItems: 'center',
        backgroundColor: colors.Ivory100,
        justifyContent: 'center',
    },
    // 선택하기 전 text
    defaultTextStyle: {
        color: colors.Gray900,
    },
    // 선택한 후 button
    selectedButton: {
        backgroundColor: colors.Green900,
        borderColor: colors.Green900,
    },
    // 선택한 후 text
    selectedTextStyle: {
        color: colors.Ivory100,
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
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalContent: {
        backgroundColor: colors.Ivory100,
        marginTop: 20,
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
        marginRight: 10,
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
        Color: colors.Ivory100,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    moodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        marginRight: 100,
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
        marginTop: 110,
        marginBottom: 20,
    },

    closeButtonText: {
        color: colors.Ivory100,
        fontSize: 15,
    },
    // 여기부터 욘짱

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalContent: {
        backgroundColor: colors.Ivory100,
        marginTop: 20,
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
        marginRight: 10,
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
        Color: colors.Ivory100,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    moodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        marginRight: 100,
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
        marginTop: 110,
        marginBottom: 20,
    },

    closeButtonText: {
        color: colors.Ivory100,
        fontSize: 15,
    },

})
export default KeywardRecmdScreen;