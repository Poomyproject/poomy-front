import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView ,FlatList} from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import Modal from 'react-native-modal';
import ApiClient from '../auth/ApiClient';

const LikeScreen = () => {
    const [interestPlace, setInterestPlace] = useState('');
    const [interestMood, setInterestMood] = useState('');
    const [places, setPlaces] = useState([]);  // 장소 데이터 상태
    const [moods, setMoods] = useState([]);    // 분위기 데이터 상태
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [tempSelectedPlace, setTempSelectedPlace] = useState('');
    const [tempSelectedMood, setTempSelectedMood] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await ApiClient.get('/api/spots');
                if (response.data && response.data.success) {
                    setPlaces(response.data.response); 
                } else {
                    console.error('Failed to fetch places:', response.data);
                }
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };
        fetchPlaces(); 
    }, []);

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const response = await ApiClient.get('/api/moods');
                if (response.data && response.data.success) {
                    setMoods(response.data.response);
                } else {
                    console.error('Failed to fetch Moods:', response.data);
                }
            } catch (error) {
                console.error('Error fetching Moods:', error);
            }
        };
        fetchMoods();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await ApiClient.get('/api/favorite');
                if (response.data && response.data.success) {
                    setFavorites(response.data.response);
                } else {
                    console.error('Failed to fetch favorite list:', response.data);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);



    const toggleModal = (isPlace = false) => {
        setIsSelectingPlace(isPlace);
        setTempSelectedPlace(interestPlace);
        setTempSelectedMood(interestMood);
        setModalVisible(!isModalVisible);
    };

    const handleSelectOption = (option) => {
        if (isSelectingPlace) {
            setTempSelectedPlace(tempSelectedPlace === option ? '' : option);
        } else {
            setTempSelectedMood(tempSelectedMood === option ? '' : option);
        }
    };

    const applySelection = () => {
        if (isSelectingPlace) {
            setInterestPlace(tempSelectedPlace);
        } else {
            setInterestMood(tempSelectedMood);
        }
        setModalVisible(false);
    };

    const cancelSelection = () => {
        setTempSelectedPlace('');
        setTempSelectedMood('');
        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.favoriteItem}>
            <Image source={{ uri: item.image }} style={styles.shopImage} />
            <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{item.shopName}</Text>
                <View style={styles.tagContainer}>
                    <View style={styles.tag}><Text style={styles.tagText}>{item.spot}</Text></View>
                    <View style={styles.tag}><Text style={styles.tagText}>{item.mood}</Text></View>
                </View>
                <View style={styles.locationContainer}>
                    <Image source={require('../../assets/pin.png')} style={styles.locationIcon} />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Image source={require('../../assets/img_liked_heart.png')} style={styles.favoriteIcon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => toggleModal(true)} style={[styles.textInput, interestPlace ? styles.selectedButton : {}]}>
                    <Text style={interestPlace ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestPlace || "장소"}
                    </Text>
                    {interestPlace ? (
                        <TouchableOpacity onPress={() => setInterestPlace('')}>
                            <Image source={require('../../assets/85-close.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../../assets/down.png')} style={styles.downIcon} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleModal(false)} style={[styles.textInput, interestMood ? styles.selectedButton : {}]}>
                    <Text style={interestMood ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestMood || "분위기"}
                    </Text>
                    {interestMood ? (
                        <TouchableOpacity onPress={() => setInterestMood('')}>
                            <Image source={require('../../assets/85-close.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../../assets/down.png')} style={styles.downIcon} />
                    )}
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.bottomModal}>
                <View style={styles.modalContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{isSelectingPlace ? "장소" : "분위기"} 선택</Text>
                        <TouchableOpacity onPress={cancelSelection}>
                            <Image source={require('../../assets/close.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.moodContainer}>
                    {(isSelectingPlace ? places : moods).map((option) => {
                        const isSelected = (isSelectingPlace ? tempSelectedPlace : tempSelectedMood) === option.name;
                        return (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.moodButton,
                                    isSelected && styles.selectedMood
                                ]}
                                onPress={() => handleSelectOption(option.name)}
                            >
                                <Text style={[styles.moodText, isSelected && styles.selectedText]}>
                                    {option.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                    <TouchableOpacity onPress={applySelection} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>적용하기</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image
                            source={require('../../assets/img_empty_like.png')} 
                            style={styles.emptyImage}
                        />
                        <Text style={styles.emptyText}>아직 찜한 소퓸샵이 없어요</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Ivory100,
    },
    downIcon: {
        width: 14,
        height: 8,
        marginLeft: 6,
    },
    closeIcon: {
        width: 20,
        height: 20,
        marginLeft: 6,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding : 10,
    },
    textInput: {
        flexDirection: 'row',
        height: 35,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.Gray200,
        alignItems: 'center',
        backgroundColor: colors.Ivory100,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    defaultTextStyle: {
        color: colors.Gray900,
    },
    selectedButton: {
        backgroundColor: colors.Green900,
        borderColor: colors.Green900,
    },
    selectedTextStyle: {
        color: colors.Ivory100,
    },
    moodButton: {
        borderWidth: 1,
        borderColor: colors.Gray100,
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    moodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: colors.Ivory100,
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
    selectedText: {
        color: colors.Ivory100, // 선택된 텍스트 색상
    },
    text: {
        ...fonts.Body1,
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft : 230,
    },
    listContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    shopImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: colors.Gray200,
    },
    shopInfo: {
        flex: 1,
    },
    shopName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Gray900,
        marginBottom: 8,
    },
    tagContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    tag: {
        backgroundColor: colors.Ivory100,
        borderColor: colors.Gray200,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    tagText: {
        color: colors.Gray900,
        ...fonts.Body3,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    locationText: {
        color: colors.Gray700,
        fontSize: 12,
    },
    favoriteIcon: {
        width: 24,
        height: 24,
        tintColor: colors.Green900,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyImage: {
        width: 191,
        height: 201,
        marginTop : 109,
    },
    emptyText: {
        ...fonts.Title3,
        color: colors.Gray400,
        marginTop : 49,
    },
});

export default LikeScreen;
