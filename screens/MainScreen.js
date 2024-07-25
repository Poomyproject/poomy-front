import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ViewComponent } from 'react-native';
import colors from '../config/colors';

const { width, height } = Dimensions.get('window');
const logoSize = width * 0.3; // 화면 너비의 40%를 로고 크기로 설정

const MainScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
            <Image source={require('../assets/main_logo.png')} style={styles.logo} />
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
                    <Image source={require('../assets/Rectangle1.png')} />
                    <Text style={styles.placeText}>아기자기한</Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Rectangle1.png')} />
                    <Text style={styles.placeText}>모던</Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Rectangle1.png')} />
                    <Text style={styles.placeText}>빈티지</Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Rectangle1.png')} />
                    <Text style={styles.placeText}>럭셔리</Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Rectangle1.png')} />
                    <Text style={styles.placeText}>테마별</Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                    <Text style={styles.sectionTitle_sec}>오늘은 크리스마스, </Text>
                    <Text style={styles.sectionTitle_sec_color}>#홍대 </Text>
                    <Text style={styles.sectionTitle_sec}>로가자! </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{ alignItems: 'center', marginLeft: 25 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/Frame1.png')} style={styles.newsletterImage} />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.rightIconContainer}>
                <Text style={styles.sectionTitle}>지역별 추천</Text>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{ marginLeft: 25 }} />
                <TouchableOpacity>
                    <Text style={styles.keword_text}>홍대</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>이태원</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>신사</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>영등포</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>북촌 한옥마을</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>북촌 한옥마을</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.keword_text}>북촌 한옥마을</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                    <Text style={styles.sectionTitle_sec}>뉴스레터 </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.newletterMainText}>우리들의 PICK</Text>
                    <Text style={styles.newletterDetailText}>이거부터저거까지 다 만나보세 다 만나보세요. 이게 강남 소품샵이야 룰루루루루루루루루루루</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.newletterMainText}>우리들의 PICK</Text>
                    <Text style={styles.newletterDetailText}>이거부터저거까지 다 만나보세 다 만나보세요. 이게 강남 소품샵이야 룰루루루루루루루루루루</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/Rectangle1.png')} style={styles.newletter} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.newletterMainText}>우리들의 PICK</Text>
                    <Text style={styles.newletterDetailText}>이거부터저거까지 다 만나보세 다 만나보세요. 이게 강남 소품샵이야 룰루루루루루루루루루루</Text>
                </View>
            </View>




            <View style={{ marginTop: 17 }} />
            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                    <Text style={styles.sectionTitle_sec}>다꾸템 건질 </Text>
                    <Text style={styles.sectionTitle_sec_color}>#화려한 </Text>
                    <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{ alignItems: 'center', marginLeft: 30 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
            </ScrollView>


            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                    <Text style={styles.sectionTitle_sec}>피규어 건질 </Text>
                    <Text style={styles.sectionTitle_sec_color}>#아기자기한 </Text>
                    <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{ alignItems: 'center', marginLeft: 30 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 20 }}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
            </ScrollView>


            <View style={{ padding: '5%', }} />
        </ScrollView>
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
        width: logoSize,
        height: logoSize,
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
        marginTop: 40,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.Gray900,
    },
    sectionTitle_sec_color: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.Green900,
    },
    sectionTitle_sec_view: {
        width: '80%',
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
        width:260
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 30,
    },
    placeText: {
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
        height: 200,
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
        width: 130,
        height: 180,
    },
    last_new_Image: {
        width: 140,
        height: 140,
    }
});

export default MainScreen;
