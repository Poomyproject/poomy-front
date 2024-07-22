import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ViewComponent } from 'react-native';

const { width, height } = Dimensions.get('window');
const logoSize = width * 0.3; // 화면 너비의 40%를 로고 크기로 설정

const MainScreen = () => {
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
            <Image source={require('../assets/main_logo.png')} style={styles.logo} />
            <TouchableOpacity
                style={styles.searchContainer}
                onPress={() => navigation.navigate('SearchScreen')}
            >
                <Text style={styles.searchText}>내가찾는 소품샵이름을 검색해보세요</Text>
                <Image source={require('../assets/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightIconContainer}>
                <Text style={styles.sectionTitle}>지역별 추천</Text>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{alignItems: 'center',marginLeft: 30 }}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/area.png')} />
                    <Text style={styles.placeText}>홍대</Text>
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
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/newsletter.png')} style={styles.newsletterImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/newsletter.png')} style={styles.newsletterImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/newsletter.png')} style={styles.newsletterImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/newsletter.png')} style={styles.newsletterImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/newsletter.png')} style={styles.newsletterImage} />
                </View>
            </ScrollView>

            <View style={styles.rightIconContainer}>
                <Text style={styles.sectionTitle}>키워드 검색</Text>
            </View>

            <View style={styles.keword_view}>
                <View style={{marginTop:'5%'}}/>
                <View style={styles.keword}>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#온화한</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#화려한</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#세련된</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#모던한</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.keword}>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#클래식한</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#도시적인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>#아기자기한</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                   <Text style={styles.sectionTitle_sec}>다꾸템 건질 </Text>
                   <Text style={styles.sectionTitle_sec_color}>#화려한 </Text>
                   <Text style={styles.sectionTitle_sec}>소품샵 </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon}/>
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
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
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
                <View style={{alignItems: 'center',marginLeft: 20}}>
                    <Image source={require('../assets/shop.png')} style={styles.shopImage} />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.rightIconContainer}>
                <View style={styles.sectionTitle_sec_view}>
                   <Text style={styles.sectionTitle_sec}>뉴스레터 </Text>
                </View>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <View>
                <Text style={{marginTop:'8%', fontSize:'18%', color:'#444444'}}>우리들의 PICK</Text>
                <Text style={{marginTop:'1%', fontSize:'13%', color:'#888888',}}>이거부터저거까지 다 만나보세요. 이게 강남 소품샵이야</Text>
                <Text style={{marginTop:'1%', fontSize:'13%', color:'#888888',}}>근데 강남이 아닐수도..하여튼 우리가 직접 찾아가 봤습니다!!씨몬.</Text>
                <Image source={require('../assets/last_newletter.png')} style={{alignItems: 'center', marginTop:'3%'}} />
            </View>

            <View>
                <Text style={{marginTop:'8%', fontSize:'18%', color:'#444444'}}>소품샵 Road 추천</Text>
                <Text style={{marginTop:'1%', fontSize:'13%', color:'#888888',}}>이거부터저거까지 다 만나보세요. 이게 강남 소품샵이야</Text>
                <Text style={{marginTop:'1%', fontSize:'13%', color:'#888888',}}>근데 강남이 아닐수도..하여튼 우리가 직접 찾아가 봤습니다!!씨몬.</Text>
                <Image source={require('../assets/last_newletter.png')} style={{alignItems: 'center', marginTop:'3%'}} />
            </View>

            <View style={{padding:'5%',}}/>
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
        backgroundColor: '#F8F7F2',
        borderRadius: 10,
    },
    searchText: {
        flex: 1,
        color: '#C0C0C0',
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
        color: '#444444',
        width: '80%', 
      },
      sectionTitle_sec: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444444',
      },
      sectionTitle_sec_color: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1FAA67',
      },
      sectionTitle_sec_view: {
        width: '80%',
        flexDirection: 'row', 
      },
      rightText: {
        color: '#444444', 
        marginTop: 5, 
      },
      rightText_sec: {
        color: '#444444', 
        marginTop: 10, 
      },
      rightIcon: {
        width: 24,
        height: 24,
        marginTop: 1, 

      },
      placeContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-start',
        marginTop: 30,
      }, 
      placeText: {
        marginTop: 15,
        color: '#454C53',
      }, 
      recommandContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignSelf: 'flex-start'
      },
      newsletterImage: {
        width: 210, 
        height: 170, 
    },
    keword:{
        flexDirection: 'row',
        marginLeft:'7%',
        marginTop:'3%'
    },
    keword_view:{
        alignSelf: 'flex-start'
    },
    keword_text:{
        alignSelf: 'flex-start', 
        padding: 10, // 텍스트 주위의 여백
        paddingHorizontal: 15,
        borderWidth: 1, // 테두리 두께
        borderColor: '#79CCA4', // 테두리 색상
        color: '#666666',
        borderRadius: 19, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal:5,
        fontSize:'12%'
    },
    shopImage:{
        width: 130, 
        height: 180, 
    },
    last_new_Image:{
        width: 140, 
        height: 140, 
    }
});

export default MainScreen;
