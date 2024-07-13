import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');
const logoSize = width * 0.3; // 화면 너비의 40%를 로고 크기로 설정

const MainScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={require('../assets/main_logo.png')} style={styles.logo} />
            <TouchableOpacity
                style={styles.searchContainer}
                onPress={() => navigation.navigate('SearchScreen')}
            >
                <Text style={styles.searchText}>내가찾는 소품샵이름을 검색해보세요</Text>
                <Image source={require('../assets/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
            <View >

            </View>

            <TouchableOpacity style={styles.rightIconContainer}>
                <Text style={styles.sectionTitle}>지역별 추천</Text>
                <Text style={styles.rightText}>더 보기</Text>
                <Image source={require('../assets/right.png')} style={styles.rightIcon} />
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.placeContainer}>
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
            </ScrollView>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
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
        marginLeft: 8, 
        width: '80%', 
      },
      rightText: {
        color: '#444444', 
        marginTop: 7, 
      },
      rightIcon: {
        width: 24,
        height: 24,
        marginTop: 4, 

      },
      placeContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-start',
        marginTop: 35,
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
});

export default MainScreen;
