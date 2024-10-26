import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';
import ApiClient, { setAxiosInterceptors } from '../auth/ApiClient';
import { ShopContext } from '../shop/ShopContext'; // ShopContext 임포트
import { KeywordContext } from '../keyword/KeywordContext'
import { MoodContext } from '../keyword/MoodContext';
import { NewsLetterContext } from '../context/NewsLetterContext'
import styles from './styles'; // 별도 스타일 파일로 분리

const { width, height } = Dimensions.get('window');

const themes = [
    { id: 1, name: '아기자기', image: require('../../assets/home_mood1.png') },
    { id: 2, name: '모던', image: require('../../assets/home_mood2.png') },
    { id: 3, name: '빈티지', image: require('../../assets/home_mood3.png') },
    { id: 4, name: '럭셔리', image: require('../../assets/home_mood4.png') },
    { id: 5, name: '테마별', image: require('../../assets/home_mood5.png') },
];

const MainScreen = ({ navigation }) => {

    const { setSelectedShopId } = useContext(ShopContext); // ShopContext에서 setSelectedShopId를 가져옴
    const { setSelectedSpotName } = useContext(KeywordContext);
    const { setSelectedMoodId } = useContext(MoodContext);
    const { setSelectedNewsLetterId } = useContext(NewsLetterContext);

    const handleShopPress = (shopId) => {
        setSelectedShopId(shopId); // shopId 저장
        navigation.navigate('ShopDetail', { shopId }); // ShopDetail 화면으로 이동하며 shopId 전달
    };

    const handleKeyword = (spotName) => {
        setSelectedMoodId(''); // Reset mood when keyword is selected
        setSelectedSpotName(spotName);
        navigation.navigate('KeywordStack', { screen: 'Keyword', params: { spotName } });
    };

    const handleMood = (moodId) => {
        setSelectedSpotName(''); // Reset keyword when mood is selected
        setSelectedMoodId(moodId);
        navigation.navigate('KeywordStack', { screen: 'Keyword', params: { moodId } });
    };

    const handleNewsLetter = (newsletterId) => {
        setSelectedNewsLetterId(newsletterId);
        navigation.navigate('NewsLetterStack', { screen: 'NewsLetterDetail', params: { newsletterId } });
    };

    // 가장 상단 샵 정보 불러오기
    const [homeSpotShop, setHomeSpotShop] = useState(null);
    // 지역 랜덤으로 6개 추출
    const [homeSpot, setHomeSpot] = useState(null);
    // 뉴스레터
    const [newsletters, setNewsletters] = useState([]);
    // 분위기 별 추출
    const [moods, setMoods] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // 데이터 fetching
    useEffect(() => {
        setAxiosInterceptors(navigation);

        // 가장 상단 샵 정보 불러오기
        const fetchHomeSpotShop = async () => {
            try {
                const response = await ApiClient.get('/api/home/spot/shop');
                if (response.data.success) {
                    setHomeSpotShop(response.data.response);
                } else {
                    throw new Error('소품샵 데이터 로딩 실패');
                }
                console.log(response.data.response);
            } catch (err) {
                console.error('Error fetching home spot shop:', err);
                setError(err);
                Alert.alert('데이터 로딩 실패', '소품샵 데이터를 불러오는 데 실패했습니다.');
            }
        };

        // 지역 랜덤으로 6개 추출 
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
                    setNewsletters(response.data.response);  // 뉴스레터 데이터를 상태에 저장
                } else {
                    throw new Error('뉴스레터 데이터 로딩 실패');
                }
            } catch (err) {
                console.error('Error fetching newsletters:', err);
                setError(err);
                Alert.alert('데이터 로딩 실패', '뉴스레터 데이터를 불러오는 데 실패했습니다.');
            }
        };

        // 분위기 데이터 
        const fetchMoodShops = async () => {
            try {
                const response = await ApiClient.get('/api/home/mood/shop');
                if (response.data.success) {
                    setMoods(response.data.response);
                } else {
                    throw new Error('분위기 데이터 로딩 실패');
                }
            } catch (err) {
                console.error('Error fetching home spot:', err);
                setError(err);
                Alert.alert('데이터 로딩 실패', '분위기 데이터를 불러오는 데 실패했습니다.');
            }
        };

        // API 호출
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchHomeSpotShop(), fetchHomeSpot(), fetchNewsletters(), fetchMoodShops()]); // 병렬로 호출
            setLoading(false);
        };

        fetchData();
    }, []);

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

    // moods 데이터에서 id가 1인 항목과 id가 2인 항목 필터링
    const moodItem1 = moods.find((item) => item.id === 1);
    const moodItem2 = moods.find((item) => item.id === 2);

    return (
        <View style={{ backgroundColor: 'white', marginTop: 10, }}>
            <Image source={require('../../assets/MainLogo.png')} style={styles.logo} />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => navigation.navigate('SearchStack', { screen: 'Search' })}>
                    <Text style={styles.searchText}>내가찾는 소품샵 이름을 검색해보세요</Text>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>

                <View style={styles.rightIconContainer}>
                    <Text style={styles.sectionTitle}>분위기 추천</Text>
                </View>

                <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                    {themes.map((theme, index) => (
                        <TouchableOpacity key={theme.id}
                            onPress={() => handleMood(theme?.name)}
                            style={{ alignItems: 'center', marginLeft: index === 0 ? 25 : 13 }}>
                            <Image source={theme.image} style={styles.themeImg} />
                            <Text style={styles.placeText}>{theme.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{homeSpotShop?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{homeSpotShop?.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>로가자! </Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView
                    horizontal={true}
                    style={styles.placeContainer2}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ marginLeft: 15 }} />
                    {homeSpotShop.shopList.slice(0, 6).map((shop, index) => (
                        <TouchableOpacity key={index} style={styles.box} onPress={() => handleShopPress(shop?.id)} >
                            <ImageBackground source={{ uri: shop?.image }} style={styles.boxshopImage}>
                                {/* 해시태그 컨테이너 */}
                                <View style={styles.hashtagContainer}>
                                    <Text style={styles.hashtagText}>{shop?.mood}</Text>
                                </View>

                                {/* 그라디언트 및 상호명 */}
                                <View style={styles.overlay}>
                                    <Image source={require('../../assets/gradient.png')} style={styles.gradientbox} />
                                    <Text style={styles.shopName}>{shop?.name}</Text>

                                    {/* 좋아요 아이콘과 숫자 */}
                                    <View style={styles.favoriteContainer}>
                                        <Image source={require('../../assets/mainheart.png')} style={styles.mainheart} />
                                        <Text style={styles.favoriteText}>{shop?.favoriteNum}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                <View style={styles.LocationRcmd}>
                    <Text style={styles.sectionTitle}>지역별 추천</Text>
                </View>

                <ScrollView horizontal={true} style={styles.placeContainer3} showsHorizontalScrollIndicator={false}>
                    <View style={{ marginLeft: 20 }} />
                    {homeSpot.map((spot, index) => (
                        <TouchableOpacity key={index} onPress={() => handleKeyword(spot?.name)}>
                            <Text style={styles.keword_text}>{spot?.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                <TouchableOpacity style={styles.rightIconContainer}
                    onPress={() => navigation.navigate('NewsLetterStack', { screen: 'NewsLetter' })}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>뉴스레터 </Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <View style={{marginTop:10,}}>
                    {newsletters.slice(0, 3).map((newsletter, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ flexDirection: 'row', marginBottom: 10 }}
                            onPress={() => handleNewsLetter(newsletter?.id)}>
                            <Image source={{ uri: newsletter?.mainImage }} style={styles.newletter} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.newletterMainText}>{newsletter?.headline}</Text>
                                <Text style={styles.newletterDetailText}>{newsletter?.subTopic}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter?.firstKeyword} </Text>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter?.secondKeyword} </Text>
                                    <Text style={{ color: colors.Gray500 }}>{newsletter?.thirdKeyword} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>



                {/* mood 첫번째 부분 */}
                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{moodItem1?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{moodItem1.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView
                    horizontal={true}
                    style={styles.placeContainer4}
                    showsHorizontalScrollIndicator={false}
                >
                    {moodItem1.shopList.slice(0, 7).map((shop, index) => (
                        <TouchableOpacity key={index} style={styles.lastView}>
                            <View>
                                <ImageBackground source={{ uri: shop.image }} style={styles.shopImage}>
                                    <View style={styles.hashtagContainer}>
                                        <Text style={styles.hashtagText}>{shop.spot}</Text>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.lastshoptext} numberOfLines={1} ellipsizeMode="tail">
                                    {shop.name.length > 7 ? `${shop.name.substring(0, 11)}...` : shop.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                {/* mood 2번째 부분 */}
                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{moodItem2?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{moodItem2?.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                    </View>
                    <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>


                <ScrollView
                    horizontal={true}
                    style={styles.placeContainer4}
                    showsHorizontalScrollIndicator={false}
                >
                    {moodItem2?.shopList.slice(0, 7).map((shop, index) => (
                        <TouchableOpacity key={index} style={styles.lastView}>
                            <View>
                                <ImageBackground source={{ uri: shop.image }} style={styles.shopImage}>
                                    <View style={styles.hashtagContainer}>
                                        <Text style={styles.hashtagText}>{shop.spot}</Text>
                                    </View>
                                </ImageBackground>
                                <Text style={styles.lastshoptext} numberOfLines={1} ellipsizeMode="tail">
                                    {shop.name.length > 7 ? `${shop.name.substring(0, 11)}...` : shop.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>


                <View style={{ padding: '20%', }} />
            </ScrollView>
        </View>
    );
};

export default MainScreen;