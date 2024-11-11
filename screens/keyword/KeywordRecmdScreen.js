import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { Provider } from 'react-native-paper';
import Modal from 'react-native-modal';
import { KeywordContext } from './KeywordContext';
import { MoodContext } from './MoodContext';
import styles from './styles';
import PlaceMoodButtons from './PlaceMoodButtons';
import SelectionModal from './SelectionModal';
import ApiClient from '../auth/ApiClient';
import NoResults from '../search/NoResults';
import { useFavorites } from '../like/FavoriteContext';
import { ShopContext } from '../shop/ShopContext';
import colors from '../../config/colors';

const KeywardRecmdScreen = ({ navigation }) => {
    const { selectedSpotName } = useContext(KeywordContext);
    const { selectedMoodId } = useContext(MoodContext);
    const [interestPlace, setInterestPlace] = useState('');
    const [interestMood, setInterestMood] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [selectedMood, setSelectedMood] = useState('');
    const [shopList, setShopList] = useState([]); // 샵 리스트 상태 추가
    const { setSelectedShopId } = useContext(ShopContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isFavorite, handleFavoriteToggle } = useFavorites();

    const moodOptions = ['아기자기', '모던', '빈티지', '럭셔리', '테마별'];
    const placeOptions = ['홍대', '이태원', '송리단길', '영등포', '명동', '북촌 한옥마을', '성수', '강남', '종로', '혜화'];

    const moodMap = {
        "아기자기": 1,
        "모던": 2,
        "럭셔리": 3,
        "빈티지": 4,
        "테마별": 5
    };

    const placeMap = {
        "홍대": 1,
        "이태원": 2,
        "송리단길": 4,
        "영등포": 5,
        "명동": 6,
        "북촌 한옥마을": 7,
        "성수": 8,
        "강남": 9,
        "종로": 11,
        "혜화": 12,
    };

    // 토글 관련
    useEffect(() => {
        if (selectedSpotName && placeOptions.includes(selectedSpotName)) {
            setInterestPlace(selectedSpotName);
        }
        if (selectedMoodId && moodOptions.includes(selectedMoodId)) {
            setInterestMood(selectedMoodId);
        }
    }, [selectedSpotName, selectedMoodId]);

    useEffect(() => {
        setLoading(true); // 데이터 요청 전에 로딩 상태 설정
    
        if (!interestMood && !interestPlace) {
            fetchAllShops(); // 무드와 장소가 모두 선택되지 않았을 경우 모든 샵 로드
        } else if (interestMood && interestPlace) {
            fetchShopsByMoodAndSpot(interestMood, interestPlace); // 분위기와 장소가 모두 선택된 경우
        } else if (interestMood) {
            fetchShopsByMood(interestMood); // 분위기만 선택된 경우
        } else if (interestPlace) {
            fetchShopsBySpot(interestPlace); // 장소만 선택된 경우
        }
    }, [interestMood, interestPlace]);
    
    // 상세페이지로 네비게이션
    const handleShopPress = (shopId) => {
        setSelectedShopId(shopId);
        navigation.navigate('ShopDetail', { shopId });
    };


    const toggleModal = (isPlace = false) => {
        setIsSelectingPlace(isPlace);
        setModalVisible(!isModalVisible);
    };

    const applySelection = () => {
        if (isSelectingPlace && selectedMood) {
            setInterestPlace(selectedMood);
        } else if (!isSelectingPlace && selectedMood) {
            setInterestMood(selectedMood);
        }
        
        setSelectedMood('');
        setModalVisible(false);
    };

    // 무드X 장소X (모든 샵)
    const fetchAllShops = async () => {
        try {
            const response = await ApiClient.get('/api/keyword'); // 모든 샵 데이터 요청
            if (response.data.success) {
                setShopList(response.data.response); // 샵 리스트 상태에 저장
            } else {
                console.error('모든 샵 리스트를 불러올 수 없습니다.');
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 무드O 장소X
    const fetchShopsByMood = async (mood) => {
        const moodId = moodMap[mood]; // mood 문자열을 ID로 변환
        if (!moodId) {
            console.error("Invalid mood:", mood);
            return;
        }

        try {
            const response = await ApiClient.get(`/api/keyword/mood/${moodId}`);
            if (response.data.success) {
                setShopList(response.data.response); // 검색 결과를 상태에 저장
            } else {
                console.error('샵 리스트를 불러올 수 없습니다.');
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 무드X 장소O
    const fetchShopsBySpot = async (place) => {
        const spotId = placeMap[place];
        if (!spotId) return;

        try {
            const response = await ApiClient.get(`/api/keyword/spot/${spotId}`);
            if (response.data.success) {
                setShopList(response.data.response);
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 무드O 장소
    const fetchShopsByMoodAndSpot = async (mood, place) => {
        const moodId = moodMap[mood];
        const spotId = placeMap[place];

        if (!moodId || !spotId) return;

        try {
            const response = await ApiClient.get(`/api/keyword/mood/${moodId}/spot/${spotId}`);
            if (response.data.success) {
                setShopList(response.data.response);
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 로딩 시 ActivityIndicator
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.Green900} />
                <Text style={styles.loadingText}>로딩 중...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <Provider>
            <View style={styles.container}>

                {/* 장소, 분위기 선택 */}
                <PlaceMoodButtons
                    interestPlace={interestPlace}
                    interestMood={interestMood}
                    toggleModal={toggleModal}
                    setInterestPlace={setInterestPlace}
                    setInterestMood={setInterestMood}
                />

                {/* 모달 창 */}
                <SelectionModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    isSelectingPlace={isSelectingPlace}
                    moodOptions={moodOptions}
                    placeOptions={placeOptions}
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    applySelection={applySelection}
                />

                <View style={{ marginBottom: 10 }} />

                {/* 샵 리스트 표시 */}
                <FlatList
                    data={shopList}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.ResultContainer} onPress={() => handleShopPress(item.id)}>

                            {/* 소품샵 이미지 */}
                            <Image source={{ uri: item.image }} style={styles.storeImg} />
                            <View style={{ width: '55%' }}>

                                {/* 소품샵 이름 */}
                                <Text style={styles.storeName}>{item.name}</Text>

                                {/* 소품샵 태그(이름, 테마) */}
                                <View style={styles.storeDetails}>
                                    <Text
                                        style={[
                                            styles.storeInfo,
                                            interestPlace && styles.interestInfo // spot이 선택되면 스타일 변경
                                        ]}
                                    >
                                        {item.spot}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.storeInfo,
                                            { marginLeft: 5 },
                                            interestMood && styles.interestInfo // mood가 선택되면 스타일 변경
                                        ]}
                                    >
                                        {item.mood}
                                    </Text>
                                </View>

                                {/* 소품샵 상세 위치 */}
                                <View style={styles.addressContainer}>
                                    <Image source={require('../../assets/map-pin.png')} style={styles.pinImg} />
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
                                        {item.location}
                                    </Text>
                                </View>
                            </View>

                            {/* 찜 버튼 */}
                            <TouchableOpacity
                                style={styles.heartContainer}
                                onPress={() => handleFavoriteToggle(item.id)} // 찜 상태 토글
                            >
                                <Image
                                    source={
                                        isFavorite(item.id) // 찜 상태에 따라 이미지 변경
                                            ? require('../../assets/img_liked_heart.png')
                                            : require('../../assets/heart.png')
                                    }
                                    style={styles.heartImg}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </Provider>
    );
};

export default KeywardRecmdScreen;
