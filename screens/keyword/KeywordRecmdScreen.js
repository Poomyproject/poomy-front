import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, item } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Menu, Button, Provider } from 'react-native-paper';
import { KeywordContext } from './KeywordContext'
import { MoodContext } from './MoodContext';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles'

const KeywardRecmdScreen = ({ navigation }) => {

    const { selectedSpotName } = useContext(KeywordContext); // ShopContext에서 shopId를 가져옴
    const { selectedMoodId } = useContext(MoodContext); // MoodContext에서 themeName를 가져옴
    const [interestPlace, setInterestPlace] = useState(''); // 장소 상태 관리
    const [interestMood, setInterestMood] = useState(''); // 분위기 상태 관리
    const [isModalVisible, setModalVisible] = useState(false); // 모달 상태 관리
    const [selectedMood, setSelectedMood] = useState(''); // 선택된 분위기 (하나만 선택)
    const [isSelectingPlace, setIsSelectingPlace] = useState(false); // 장소 선택 모달인지 분위기 선택 모달인지

    const [tempSelectedPlace, setTempSelectedPlace] = useState('');
    const [tempSelectedMood, setTempSelectedMood] = useState('');



    // 장소와 분위기 목록
    const moodOptions = ['아기자기', '모던', '빈티지', '럭셔리', '테마별'];
    const placeOptions = ['강남', '명동', '북촌 한옥마을', '성수', '송리단길', '영등포', '이태원', '종로', '혜화', '홍대'];

    // 네비게이션에서 받은 selectedSpotName이 있으면 interestPlace에 반영
    useEffect(() => {
        if (selectedSpotName && placeOptions.includes(selectedSpotName)) {
            setInterestPlace(selectedSpotName); // spotName을 interestPlace에 설정
        }
        if (selectedMoodId && moodOptions.includes(selectedMoodId)) {
            setInterestMood(selectedMoodId);
        }
    }, [selectedSpotName, selectedMoodId,]);

    const cancelSelection = () => {
        setTempSelectedPlace('');
        setTempSelectedMood('');
        setModalVisible(false);
    };

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

    // 최신순, 조회수순, 어쩌구 정렬
    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('최신순');

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleMenuSelect = (option) => {
        setSelectedOption(option);
        closeMenu();
        // 여기에서 추가적인 정렬 로직을 처리할 수 있습니다.
    };

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <View style={styles.buttoncontainer}>

                    <View style={{ width: '80%', flexDirection: 'row' }}>
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
                                    <Image source={require('../../assets/85-close.png')} style={styles.close} />
                                </TouchableOpacity>
                            ) : (
                                <Image source={require('../../assets/down.png')} style={styles.down} />
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
                                    <Image source={require('../../assets/85-close.png')} style={styles.close} />
                                </TouchableOpacity>
                            ) : (
                                <Image source={require('../../assets/down.png')} style={styles.down} />
                            )}
                        </TouchableOpacity>
                    </View>



                    <View style={styles.menuContainer}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <Button onPress={openMenu} style={styles.menuButton} labelStyle={{ color: 'grey' }}>
                                    {selectedOption} ▼
                                </Button>
                            }
                            style={[styles.menuDropdown,]}
                        >
                            <Menu.Item onPress={() => handleMenuSelect('최신순')} title="최신순" titleStyle={{ fontSize: 14 }} />
                            <Menu.Item onPress={() => handleMenuSelect('오래된순')} title="오래된순" titleStyle={{ fontSize: 14 }} />
                            <Menu.Item onPress={() => handleMenuSelect('유용한순')} title="유용한순" titleStyle={{ fontSize: 14 }} />
                        </Menu>
                    </View>


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
                            <Text style={styles.text}>{isSelectingPlace ? "장소" : "분위기"} 선택</Text>
                            <TouchableOpacity onPress={cancelSelection}>
                                <Image source={require('../../assets/close.png')} style={styles.image} />
                            </TouchableOpacity>
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
        </Provider>
    );
};

export default KeywardRecmdScreen;