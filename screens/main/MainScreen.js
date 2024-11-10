import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import colors from '../../config/colors';
import ApiClient, { setAxiosInterceptors } from '../auth/ApiClient';
import { ShopContext } from '../shop/ShopContext';
import { KeywordContext } from '../keyword/KeywordContext';
import { MoodContext } from '../keyword/MoodContext';
import { NewsLetterContext } from '../context/NewsLetterContext';
import { useFavorites } from '../like/FavoriteContext';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import ShopRecommendation from './ShopRecommendation';

const { width, height } = Dimensions.get('window');

const themes = [
    { id: 1, name: '아기자기', image: require('../../assets/home_mood1.png') },
    { id: 2, name: '모던', image: require('../../assets/home_mood2.png') },
    { id: 3, name: '빈티지', image: require('../../assets/home_mood3.png') },
    { id: 4, name: '럭셔리', image: require('../../assets/home_mood4.png') },
    { id: 5, name: '테마별', image: require('../../assets/home_mood5.png') },
];

const MainScreen = ({ navigation }) => {
    const { setSelectedShopId } = useContext(ShopContext);
    const { setSelectedSpotName } = useContext(KeywordContext);
    const { setSelectedMoodId } = useContext(MoodContext);
    const { setSelectedNewsLetterId } = useContext(NewsLetterContext);
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    const [refreshing, setRefreshing] = useState(false);
    const [homeSpotShop, setHomeSpotShop] = useState(null);
    const [homeSpot, setHomeSpot] = useState([]);
    const [newsletters, setNewsletters] = useState([]);
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHomeSpotShop = async () => {
        try {
            const response = await ApiClient.get('/api/home/spot/shop');
            if (response.data.success) {
                setHomeSpotShop(response.data.response);
            } else {
                throw new Error('소품샵 데이터 로딩 실패');
            }
        } catch (err) {
            console.error('Error fetching home spot shop:', err);
            setError(err);
            Alert.alert('데이터 로딩 실패', '소품샵 데이터를 불러오는 데 실패했습니다.');
        }
    };

    const fetchHomeSpot = async () => {
        try {
            const response = await ApiClient.get('/api/home/spot');
            if (response.data.success) {
                setHomeSpot(response.data.response);
            } else {
                throw new Error('지역 데이터 로딩 실패');
            }
        } catch (err) {
            console.error('Error fetching home spot:', err);
            setError(err);
            Alert.alert('데이터 로딩 실패', '지역 데이터를 불러오는 데 실패했습니다.');
        }
    };

    const fetchNewsletters = async () => {
        try {
            const response = await ApiClient.get('/api/home/newsletter');
            if (response.data.success) {
                setNewsletters(response.data.response);
            } else {
                throw new Error('뉴스레터 데이터 로딩 실패');
            }
        } catch (err) {
            console.error('Error fetching newsletters:', err);
            setError(err);
            Alert.alert('데이터 로딩 실패', '뉴스레터 데이터를 불러오는 데 실패했습니다.');
        }
    };

    const fetchMoodShops = async () => {
        try {
            const response = await ApiClient.get('/api/home/mood/shop');
            if (response.data.success) {
                setMoods(response.data.response);
            } else {
                throw new Error('분위기 데이터 로딩 실패');
            }
        } catch (err) {
            console.error('Error fetching mood shops:', err);
            setError(err);
            Alert.alert('데이터 로딩 실패', '분위기 데이터를 불러오는 데 실패했습니다.');
        }
    };


    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchHomeSpotShop(), fetchHomeSpot(), fetchNewsletters(), fetchMoodShops()]);
            setError(null);
        } catch (err) {
            console.error('데이터 로딩 실패:', err);
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    useEffect(() => {
        setAxiosInterceptors(navigation);
        fetchData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const handleFavoriteToggle = (shopId) => {
        if (isFavorite(shopId)) {
            removeFavorite(shopId);
        } else {
            addFavorite(shopId);
        }
    };

    const handleShopPress = (shopId) => {
        setSelectedShopId(shopId);
        navigation.navigate('ShopDetail', { shopId });
    };

    const handleKeyword = (spotName) => {
        setSelectedMoodId('');
        setSelectedSpotName(spotName);
        navigation.navigate('KeywordStack', { screen: 'Keyword', params: { spotName } });
    };

    const handleMood = (moodId) => {
        setSelectedSpotName('');
        setSelectedMoodId(moodId);
        navigation.navigate('KeywordStack', { screen: 'Keyword', params: { moodId } });
    };

    const handleNewsLetter = (newsletterId) => {
        setSelectedNewsLetterId(newsletterId);
        navigation.navigate('NewsLetterStack', { screen: 'NewsLetterDetail', params: { newsletterId } });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.Green900} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>데이터를 불러오는 데 실패했습니다.</Text>
            </View>
        );
    }

    const moodItem1 = moods.find((item) => item.id === 1);
    const moodItem2 = moods.find((item) => item.id === 2);

    return (
        <View style={{ backgroundColor: 'white', marginTop: 10 }}>
            {/* 맨 상단 로고 */}
            <Image source={require('../../assets/MainLogo.png')} style={styles.logo} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#1FAA67" 
                />
            }
            >
                {/* 검색바 */}
                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => navigation.navigate('SearchStack', { screen: 'Search' })}
                >
                    <Text style={styles.searchText}>내가찾는 소품샵 이름을 검색해보세요</Text>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>

                {/* 분위기 카테고리 상단 */}
                <View style={styles.rightIconContainer}>
                    <Text style={styles.sectionTitle}>분위기 추천</Text>
                </View>

                <ScrollView horizontal style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                    {themes.map((theme, index) => (
                        <TouchableOpacity key={theme.id} onPress={() => handleMood(theme.name)} style={{ alignItems: 'center', marginLeft: index === 0 ? 25 : 13 }}>
                            <Image source={theme.image} style={styles.themeImg} />
                            <Text style={styles.placeText}>{theme.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 소품샵 이미지 추천 */}
                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{homeSpotShop?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{homeSpotShop?.hashtag}</Text>
                        <Text style={styles.sectionTitle_sec}>(으)로가자!</Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                {/* 소품샵 이미지 */}
                <ScrollView horizontal style={styles.placeContainer2} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: 15 }} />
                    {homeSpotShop?.shopList?.slice(0, 6).map((shop, index) => (
                        <TouchableOpacity key={index} style={styles.box} onPress={() => handleShopPress(shop.id)}>
                            <ImageBackground source={{ uri: shop.image }} style={styles.boxshopImage}>
                                <View style={styles.hashtagContainer}>
                                    <Text style={styles.hashtagText}>{shop.mood}</Text>
                                </View>
                                <View style={styles.overlay}>
                                    <Image source={require('../../assets/gradient.png')} style={styles.gradientbox} />
                                    <Text style={styles.shopName}>{shop.name}</Text>
                                    <View style={styles.favoriteContainer}>
                                        <TouchableOpacity onPress={() => handleFavoriteToggle(shop.id)}>
                                            <Image
                                                source={isFavorite(shop.id) ? require('../../assets/img_liked_heart.png') : require('../../assets/mainheart.png')}
                                                style={styles.mainheart}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.favoriteText}>
                                            {isFavorite(shop.id) ? shop.favoriteNum + 1 : shop.favoriteNum}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 지역 랜덤 6개 박스 */}
                <View style={styles.LocationRcmd}>
                    <Text style={styles.sectionTitle}>지역별 추천</Text>
                </View>

                {/* 지역 랜덤 6개 박스 */}
                <ScrollView horizontal style={styles.placeContainer3} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: 20 }} />
                    {homeSpot.map((spot, index) => (
                        <TouchableOpacity key={index} onPress={() => handleKeyword(spot.name)}>
                            <Text style={styles.keword_text}>{spot.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 뉴스레터 상단바*/}
                <TouchableOpacity
                    style={styles.rightIconContainer}
                    onPress={() => navigation.navigate('NewsLetterStack', { screen: 'NewsLetter' })}
                >
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>뉴스레터 </Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                {/* 뉴스레터 3개 사진 */}
                <View style={{ marginTop: 10 }}>
                    {newsletters.slice(0, 3).map((newsletter, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: 'row', marginBottom: 10 }} onPress={() => handleNewsLetter(newsletter.id)}>
                            <Image source={{ uri: newsletter.mainImage }} style={styles.newletter} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.newletterMainText}>{newsletter.headline}</Text>
                                <Text style={styles.newletterDetailText}>{newsletter.subTopic}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter.firstKeyword} </Text>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter.secondKeyword} </Text>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter.thirdKeyword} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <ShopRecommendation
                    moodItem={moodItem1}
                    onShopPress={handleShopPress}
                />

                <ShopRecommendation
                    moodItem={moodItem2}
                    onShopPress={handleShopPress}
                />
                
                <View style={{ padding: '20%' }} />
            </ScrollView>
        </View>
    );
};

export default MainScreen;