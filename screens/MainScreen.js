import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ViewComponent, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 불러오기
import colors from '../config/colors';
import ApiClient, { setAxiosInterceptors } from '../screens/auth/ApiClient'; 


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
                    <Text style={styles.sectionTitle_sec}>
                        {homeSpotShop?.prefix || '기본값'}
                        </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{homeSpotShop.hashtag} </Text>
                        <Text style={styles.sectionTitle_sec}>로가자! </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView horizontal={true} style={styles.placeContainer2} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.box}>
                        <View style={styles.hashtagContainer}>
                            <Text style={styles.hashtagText}>{homeSpotShop.shopList[0]?.mood}</Text>
                        </View>
                        <Image source={{ uri: homeSpotShop.shopList[0]?.image }} style={styles.boxshopImage} />
                        <Text style={styles.shopName}>{homeSpotShop.shopList[0]?.name}</Text>
                        <View style={styles.favoriteContainer}>
                            <Text style={styles.favoriteText}>❤️ {homeSpotShop.shopList[0]?.favoriteNum}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <View style={{ alignItems: 'center', marginLeft: 25 }}>
                        <Image source={{ uri: homeSpotShop.shopList[1]?.image }} style={styles.newsletterImage} />
                        <Text style={styles.placeText}>{homeSpotShop.shopList[0]?.mood}</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 25 }}>
                        <Image source={{ uri: homeSpotShop.shopList[2]?.image }} style={styles.newsletterImage} />
                        <Text style={styles.placeText}>{homeSpotShop.shopList[0]?.mood}</Text>
                    </View> */}


                    {/* 욘짱이 네비게이트 옮겨놓은거 */}
                    {/* <TouchableOpacity style={{ alignItems: 'center', marginLeft: 25 }}
                        onPress={() => navigation.navigate('ShopDetail', { screen: 'ShopDetail' })}
                    >
                        <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                    </TouchableOpacity> */}
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
                        <Text style={styles.sectionTitle_sec}>{moodItem1?.prefix || '기본값'} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{moodItem1?.hashtag || '기본값'} </Text>
                        <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView horizontal={true} style={styles.placeContainer4} showsHorizontalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginLeft: 20 }}>
                        <Image source={{ uri: moodItem1?.shopList[0]?.image || '기본값' }} style={styles.shopImage} />
                        <Text>{moodItem1?.shopList[0]?.name || '기본값'}</Text>
                    </View>
                </ScrollView>

                {/* <ScrollView horizontal={true} style={styles.placeContainer4} showsHorizontalScrollIndicator={false}>
                    {moodItem1.shopList.map((shop) => (
                        <View key={shop.id} style={{ alignItems: 'center', marginLeft: 20 }}>
                            <Image source={{ uri: shop.image }} style={styles.shopImage} />
                        </View>
                    ))}
                </ScrollView> */}



                {/* mood 2번째 부분 */}
                <TouchableOpacity style={styles.rightIconContainer}>
                    <View style={styles.sectionTitle_sec_view}>
                        <Text style={styles.sectionTitle_sec}>{moodItem2?.prefix || '기본값'} </Text>
                        <Text style={styles.sectionTitle_sec_color}>#{moodItem2?.hashtag || '기본값'} </Text>
                        <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                    </View>
                    <Image source={require('../assets/right.png')} style={styles.rightIcon} />
                </TouchableOpacity>

                <ScrollView horizontal={true} style={styles.placeContainer4} showsHorizontalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginLeft: 20 }}>
                        <Image source={{ uri: moodItem2?.shopList[0]?.image || "기본값" }} style={styles.shopImage} />
                        <Text>{moodItem2?.shopList[0]?.nam || "기본값"}</Text>
                    </View>
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
        fontSize: 20,
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
    rightText_sec: {
        color: colors.Gray900,
        marginTop: 10,
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
        height: '120%'
    },
    placeContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
        height: '280%'
    },
    placeContainer3: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
        height: '55%'
    },
    placeContainer4: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
        height: '270%'
    },
    placeText: {
        fontSize: 13,
        marginTop: 15,
        color: colors.Gray700,
    },
    recommandContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignSelf: 'flex-start'
    },
    newsletterImage: {
        width: 150,
        height: 170,
    },
    keword: {
        flexDirection: 'row',
        marginLeft: '7%',
        marginTop: '3%'
    },
    keword_view: {
        alignSelf: 'flex-start'
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
        height: 200,
    },
    last_new_Image: {
        width: 140,
        height: 140,
    },
    themeImg: {
        width: 58,
        height: 58,
    },
    errorText: {
        padding: 80,
    },

    box: {
        alignItems: 'center',
        marginLeft: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: 130, // 원하는 너비
        position: 'relative', // 자식 요소들을 상대적으로 배치하기 위해 필요
    },
    hashtagContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.Ivory100, // 회색 배경
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor:colors.Green500,
        zIndex: 2, // 이미지 위로 올리기 위해 zIndex 사용

    },
    hashtagText: {
        fontSize: 12,
        color: colors.Gray700,
    },
    boxshopImage: {
        width: 130, // 이미지 너비
        height: 180, // 이미지 높이
        borderRadius: 5, // 이미지 모서리를 둥글게
    },
    shopName: {
        position: 'absolute', // 이미지 위로 올리기 위해 절대 위치 설정
        bottom: 40, // 이미지 하단에서부터 40px 위에 위치
        left: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
        left: 10,
        color: '#FFFFFF', // 흰색 텍스트
    },
    favoriteContainer: {
        position: 'absolute', // 이미지 위로 올리기 위해 절대 위치 설정
        bottom: 10, // 이미지 하단에서 10px 위에 위치
        left: 10,
        zIndex: 2, // 이미지 위로 보이도록 zIndex 추가
    },
    favoriteText: {
        fontSize: 14,
        color: '#888',
    },
});

export default MainScreen;