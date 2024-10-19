import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import colors from '../config/colors';
import ApiClient, { setAxiosInterceptors } from '../screens/auth/ApiClient'; // ApiClient의 실제 경로로 수정하세요

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
    // 여기부터 api 통신

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

    //여기까지 백엔드 api 연결
    return (
        <View style={{ backgroundColor: 'white', marginTop: 10, }}>
            <Image source={require('../assets/MainLogo.png')} style={styles.logo} />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => navigation.navigate('SearchStack', { screen: 'Search' })}>
                    <Text style={styles.searchText}>내가찾는 소품샵 이름을 검색해보세요</Text>
                    <Image source={require('../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>

                <View style={styles.rightIconContainer}>
                    <Text style={styles.sectionTitle}>분위기 추천</Text>
                </View>

                <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginLeft: 25 }}>
                        <Image source={require('../assets/home_mood1.png')} style={styles.themeImg} />
                        <Text style={styles.placeText}>아기자기</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 13 }}>
                        <Image source={require('../assets/home_mood2.png')} style={styles.themeImg} />
                        <Text style={styles.placeText}>모던</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 13 }}>
                        <Image source={require('../assets/home_mood3.png')} style={styles.themeImg} />
                        <Text style={styles.placeText}>빈티지</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 13 }}>
                        <Image source={require('../assets/home_mood4.png')} style={styles.themeImg} />
                        <Text style={styles.placeText}>럭셔리</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 13 }}>
                        <Image source={require('../assets/home_mood5.png')} style={styles.themeImg} />
                        <Text style={styles.placeText}>테마별</Text>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{homeSpotShop?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{homeSpotShop?.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>로가자! </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView
                    horizontal={true}
                    style={styles.placeContainer2}
                    showsHorizontalScrollIndicator={false}
                >
                    {homeSpotShop.shopList.slice(0, 6).map((shop, index) => (
                        <TouchableOpacity key={index} style={styles.box}>
                            <ImageBackground source={{ uri: shop?.image }} style={styles.boxshopImage}>
                                {/* 해시태그 컨테이너 */}
                                <View style={styles.hashtagContainer}>
                                    <Text style={styles.hashtagText}>{shop?.mood}</Text>
                                </View>

                                {/* 그라디언트 및 상호명 */}
                                <View style={styles.overlay}>
                                    <Image source={require('../assets/gradient.png')} style={styles.gradientbox} />
                                    <Text style={styles.shopName}>{shop?.name}</Text>

                                    {/* 좋아요 아이콘과 숫자 */}
                                    <View style={styles.favoriteContainer}>
                                        <Image source={require('../assets/mainheart.png')} style={styles.mainheart} />
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('KeywardStack', { screen: 'Keyward' })}>
                        <Text style={styles.keword_text}>{homeSpot[0]?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>{homeSpot[1]?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>{homeSpot[2]?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>{homeSpot[3]?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>{homeSpot[4]?.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>{homeSpot[5]?.name}</Text>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity style={styles.rightIconContainer}
                    onPress={() => navigation.navigate('NewsLetterStack', { screen: 'NewsLetter' })}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>뉴스레터 </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    {/* <Image source={{ uri: newsletters[0]?.mainImage }} style={styles.newletter} /> */}
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.newletterMainText}>{newsletters[0]?.headline}</Text>
                        <Text style={styles.newletterDetailText}>{newsletters[0]?.subTopic}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ color: colors.Gray500, }}>{newsletters[0]?.firstKeyword} </Text>
                            <Text style={{ color: colors.Gray500, }}>{newsletters[0]?.secondKeyword} </Text>
                            <Text style={{ color: colors.Gray500, }}>{newsletters[0]?.thirdKeyword} </Text>
                        </View>
                    </View>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.newletterMainText}>우리들의 PICK</Text>
                        <Text style={styles.newletterDetailText}>이거부터저거까지 다 만나보세요. 이게 강남 소품샵이야 룰루루루루루루루루루루</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.newletterMainText}>우리들의 PICK</Text>
                        <Text style={styles.newletterDetailText}>이거부터저거까지 다 만나보세요. 이게 강남 소품샵이야 룰루루루루루루루루루루</Text>
                    </View>
                </View>

                {/* mood 첫번째 부분 */}
                <View style={{ marginTop: 17 }} />
                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{moodItem1?.prefix} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{moodItem1.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
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
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
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

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white', //여기바꾸면 뒷배경 바뀜
    },
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: '100%',
        height: '9%',
        resizeMode: 'contain',
        marginTop: height * 0.05,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        width: '90%',
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
    },
    searchText: {
        flex: 1,
        color: colors.Gray300,
        padding: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 45,
        marginHorizontal: 20,
        alignSelf: 'flex-start'
    },
    LocationRcmd: {
        flexDirection: 'row',
        marginTop: 35,
        marginHorizontal: 20,
        alignSelf: 'flex-start'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Gray900,
        width: '80%',
        marginLeft: 5,
    },
    sectionTitle_sec: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Gray900,
    },
    sectionTitle_sec_color: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Green900,
    },
    sectionTitle_sec_view: {
        width: '90%',
        flexDirection: 'row',
        marginLeft: 5,
    },
    rightText: {
        color: colors.Gray900,
        marginTop: 5,
    },
    rightIcon: {
        width: 24,
        height: 24,
        marginTop: 1,
    },
    newletter: {
        width: 85,
        height: 85,
        marginTop: '7%',
        marginLeft: '2%'
    },
    newletterMainText: {
        marginTop: '15%',
        fontSize: 15,
        color: colors.Gray900,
        fontWeight: 'bold',
    },
    newletterDetailText: {
        marginTop: '3%',
        fontSize: '13%',
        color: colors.Gray500,
        lineHeight: 20, // 줄 간격을 조절하여 텍스트가 읽기 쉽게 함
        textAlign: 'left',
        width: 260,
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    placeContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft:15,
    },
    placeContainer3: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    placeContainer4: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    placeText: {
        fontSize: 13,
        marginTop: 15,
        color: colors.Gray700,
    },
    keword: {
        flexDirection: 'row',
        marginLeft: '7%',
        marginTop: '3%'
    },
    keword_text: {
        alignSelf: 'flex-start',
        padding: 10, // 텍스트 주위의 여백
        paddingHorizontal: 15,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Green500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 19, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        // fontWeight: 'bold',
    },
    shopImage: {
        width: 150,
        height: 150,
    },
    themeImg: {
        width: 58,
        height: 58,
    },
    errorText: {
        padding: 80,
    },
    box: {
        width: 130, // 각 아이템의 너비
        height: 170, // 각 아이템의 높이
        borderRadius: 8,
        overflow: 'hidden', // 경계 밖으로 나가는 요소 숨기기
        margin: 10,
    },
    hashtagContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.Ivory100,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: colors.Green500,
        borderWidth: 1,
    },
    hashtagText: {
        padding:2,
        fontSize: 12,
        color: 'black',
    },
    overlay: {
        padding: 10,
    },
    boxshopImage: {
        width: 130,
        height: 170,
        justifyContent: 'flex-end', // 이미지 위에 텍스트를 아래쪽에 배치
    },
    shopName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteText: {
        marginTop: 0,
        marginLeft: 5,
        fontSize: 14,
        color: colors.Ivory900,
    },
    mainheart: {
        marginTop: 1,
        width: 15,
        height: 15,
    },
    gradientbox: {
        width: 130,
        height: 80, // 그라디언트 이미지 높이 설정
        position: 'absolute',
        bottom: 0, // 아래쪽에 그라디언트 배치
    },
    lastshoptext: {
        marginLeft: 10,
        marginTop: 10,
        color: colors.Gray900,
        fontWeight: 'bold',
    },
    lastView: {
        marginTop:10,
        alignItems: 'center',
        marginLeft: 25,
        // iOS 그림자 효과
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,  // Increase shadowRadius for a more noticeable shadow

        // 배경색 설정 (그림자가 잘 보이게 하기 위해 필요할 수 있음)
        backgroundColor: 'white',
        borderRadius: 6,  // 모서리를 둥글게 하기 위해
    }
});

export default MainScreen;