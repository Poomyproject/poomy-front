import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import Modal from 'react-native-modal';
import ApiClient from '../auth/ApiClient';
import { useFocusEffect } from '@react-navigation/native';
import { ShopContext } from '../shop/ShopContext';
import { useFavorites } from '../like/FavoriteContext';

const LikeScreen = () => {
    const navigation = useNavigation();
    const { setSelectedShopId } = useContext(ShopContext);
    // const {isFavorite , handleFavoriteToggle} = useFavorites();

    const [interestPlace, setInterestPlace] = useState('');
    const [interestMood, setInterestMood] = useState('');
    const [places, setPlaces] = useState([]);  // 장소 데이터 상태
    const [moods, setMoods] = useState([]);    // 분위기 데이터 상태
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [tempSelectedPlace, setTempSelectedPlace] = useState('');
    const [tempSelectedMood, setTempSelectedMood] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // 장소와 분위기 데이터 로딩
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await ApiClient.get('/api/spots');
                if (response.data.success) setPlaces(response.data.response);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };
        const fetchMoods = async () => {
            try {
                const response = await ApiClient.get('/api/moods');
                if (response.data.success) setMoods(response.data.response);
            } catch (error) {
                console.error('Error fetching moods:', error);
            }
        };
        fetchPlaces();
        fetchMoods();
    }, []);

    // 전체 찜 데이터 로딩
    const fetchAllFavorites = async () => {
        try {
            const response = await ApiClient.get('/api/favorite');
            if (response.data.success) setFavorites(response.data.response);
            console.log(response.data.response)
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // 특정 필터를 적용하여 찜 데이터 로드
    const fetchFilteredShops = async (filterType, filterId) => {
        setLoading(true);
        try {
            const response = await ApiClient.get(`/api/favorite/${filterType}/${filterId}`);
            if (response.data.success) setFavorites(response.data.response);
        } catch (error) {
            console.error(`Error fetching filtered shops by ${filterType}:`, error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 포커스 시마다 찜 데이터 새로 로드
    useFocusEffect(
        React.useCallback(() => {
            fetchAllFavorites();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAllFavorites();
        setRefreshing(false);
    };

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

    // 필터 적용 시 선택된 `ID`를 사용하도록 변경
    const applySelection = async () => {
        setModalVisible(false);

        if (isSelectingPlace) {
            setInterestPlace(tempSelectedPlace);

            const selectedPlace = places.find(place => place.name === tempSelectedPlace);
            if (selectedPlace) {
                await fetchFilteredShops('spot', selectedPlace.id); // ID 사용
            } else {
                fetchAllFavorites(); // 선택된 필터가 없으면 전체 데이터 로드
            }

        } else {
            setInterestMood(tempSelectedMood);

            const selectedMood = moods.find(mood => mood.name === tempSelectedMood);
            if (selectedMood) {
                await fetchFilteredShops('mood', selectedMood.id); // ID 사용
            } else {
                fetchAllFavorites();
            }
        }
    };

    const cancelSelection = () => {
        setTempSelectedPlace('');
        setTempSelectedMood('');
        setModalVisible(false);
    };

    // 찜 상태를 토글하는 함수
    const handleFavoriteToggle = async (shopId) => {
        const item = favorites.find((fav) => fav.shopId === shopId);
        if (item) {
            try {
                // 현재 찜 상태를 확인하고 반대로 전송
                const response = await ApiClient.post(`/api/favorite/${shopId}/${item.isFavorite ? 'unlike' : 'like'}`);
                if (response.data.success) {
                    // 성공 시 해당 아이템의 찜 상태를 토글하여 업데이트
                    setFavorites((prev) =>
                        prev.map((fav) =>
                            fav.shopId === shopId ? { ...fav, isFavorite: !fav.isFavorite } : fav
                        )
                    );
                }
            } catch (error) {
                console.error('찜 상태 토글 중 오류 발생:', error);
            }
        }
    };


    const renderItem = ({ item }) => {
        const navigateToShopDetail = (shopId) => {
            setSelectedShopId(shopId);
            navigation.navigate('ShopDetail');
        };

        return (
            <TouchableOpacity onPress={() => navigateToShopDetail(item.shopId)} style={styles.favoriteItem}>
                <Image source={{ uri: item.image }} style={styles.shopImage} />
                <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{item.shopName}</Text>
                    <View style={styles.tagContainer}>
                        <View
                            style={[
                                styles.tag,
                                item.spot === interestPlace && styles.selectedTag // 선택된 장소와 같으면 초록색 스타일 적용
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    item.spot === interestPlace && styles.selectedTagText // 선택된 장소와 같으면 텍스트 색상 변경
                                ]}
                            >
                                {item.spot}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tag,
                                item.mood === interestMood && styles.selectedTag // 선택된 분위기와 같으면 초록색 스타일 적용
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    item.mood === interestMood && styles.selectedTagText // 선택된 분위기와 같으면 텍스트 색상 변경
                                ]}
                            >
                                {item.mood}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.locationContainer}>
                        <Image source={require('../../assets/pin.png')} style={styles.locationIcon} />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationText}>{item.location}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleFavoriteToggle(item.shopId)}>
                    <Image
                        source={item.isFavorite
                            ? require('../../assets/img_liked_heart.png')
                            : require('../../assets/heart.png')
                        }
                        style={styles.favoriteIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };


    // 필터를 초기화하고 전체 찜 리스트를 다시 로드하는 함수
    const clearFilter = async (type) => {
        if (type === 'place') {
            setInterestPlace('');
            setTempSelectedPlace('');
        } else {
            setInterestMood('');
            setTempSelectedMood('');
        }
        await fetchAllFavorites();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>찜</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => toggleModal(true)} style={[styles.textInput, interestPlace ? styles.selectedButton : {}]}>
                    <Text style={interestPlace ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestPlace || "장소"}
                    </Text>
                    {interestPlace ? (
                        <TouchableOpacity onPress={() => clearFilter('place')}>
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
                        <TouchableOpacity onPress={() => clearFilter('mood')}>
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
                keyExtractor={(item) => item.shopId.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#1FAA67"
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image
                            source={require('../../assets/img_empty_like.png')}
                            style={styles.emptyImage}
                        />
                        <Text style={styles.emptyText}>아직 찜한 소품샵이 없어요</Text>
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
    header: {
        alignItems: 'center',
        paddingTop: 55,
        paddingBottom: 5,
    },
    headerText: {
        ...fonts.Body1,
        fontWeight: '600',
        color: colors.Gray900,
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
        padding: 10,
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
        ...fonts.Body3,
        color: colors.Gray700,
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
        marginLeft: 230,
    },
    listContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
    },
    shopImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
        marginRight: 20,
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
        color: colors.Gray700,
        ...fonts.Caption1,
    },
    selectedTag: {
        backgroundColor: colors.Green50, // 선택된 태그의 배경색을 초록색으로
        borderColor: colors.Green900,     // 선택된 태그의 테두리도 초록색으로 변경
    },
    selectedTagText: {
        color: colors.Gray700, // 선택된 태그의 텍스트 색상을 흰색으로 설정
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
        width:'85%'
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
        marginTop: 109,
    },
    emptyText: {
        ...fonts.Title3,
        color: colors.Gray400,
        marginTop: 49,
    },
});

export default LikeScreen;
