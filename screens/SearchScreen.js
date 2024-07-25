import React, { useState } from 'react';
import { TextInput, FlatList, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { stores, searchRankings } from './storesData';
import colors from '../config/colors';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredStores, setFilteredStores] = useState([]);
    const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

    // 검색 기능 구현
    const searchFilterFunction = () => {
        if (searchText) {
            const newData = stores.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredStores(newData);
        } else {
            setFilteredStores(stores);
        }
        setIsSearchResultsVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={{ marginTop: "3%" }}>
                    <Image source={require('../assets/top_bar.png')} style={styles.leftarrow} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="내가 찾는 소품샵 이름을 검색해보세요."
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
                <TouchableOpacity onPress={searchFilterFunction}>
                    <Image source={require('../assets/search_img.png')} style={styles.searchImg} />
                </TouchableOpacity>

            </View>
            {!isSearchResultsVisible && (
                <>
                    <View style={styles.rightIconContainer}>
                        <Text style={styles.sectionTitle}>추천 키워드</Text>
                    </View>
                    <View horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>아기자기한</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>모던</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>빈티지</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>럭셔리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>테마별</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightIconContainer}>
                        <Text style={styles.sectionTitle}>인기 검색어</Text>
                    </View>
                </>
            )}
            {isSearchResultsVisible ? (
                <FlatList
                    data={filteredStores}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <>
                            <View style={{ flexDirection: 'row', }} >
                                <Image source={item.image} style={styles.storeImg} />
                                <View style={{ width: '55%' }}>
                                    <Text style={styles.storeName}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                                        <Text style={styles.storeInfo}>{item.category}</Text>
                                        <View style={{ marginLeft: '3%' }} />
                                        <Text style={styles.storeInfo}>{item.location}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                        <Image source={require('../assets/map-pin.png')} style={styles.pinImg} />
                                        <View style={{ marginLeft: '5%' }} />
                                        <Text>{item.address}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{marginTop:'13%'}}>
                                    <Image source={require('../assets/heart.png')} style={styles.heartImg}/>
                                </TouchableOpacity>
                            </View>
                        </>

                    )}
                />
            ) : (
                <FlatList
                    data={searchRankings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <>
                            <View style={{ flexDirection: 'row', padding: 13 }}>
                                <Text style={styles.number}>{item.id}</Text>
                                <Text style={styles.serachRankText}>{item.name}</Text>
                            </View>
                            <View style={styles.separator} />
                        </>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.Ivory100,
    },
    leftarrow: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    searchImg: {
        height: 25,
        width: 25,
        marginLeft: '10%'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 55,
    },
    textInput: {
        height: 50,
        paddingHorizontal: 25, // 입력 내용과 테두리 사이의 여백
        borderRadius: 5,      // 모서리 둥글게 하기
        alignItems: 'center',
        width: '80%',
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    searchButtonText: {
        color: colors.Gray300,
    },
    itemText: {
        padding: 10,
    },
    number: {
        fontSize: 20,
        fontWeight: 1000,
        color: colors.Green900,
        marginLeft: 13,
    },
    serachRankText: {
        fontSize: 15,
        color: colors.Gray300,
        marginLeft: 23,
        marginTop: 1,
    },

    separator: {
        borderBottomWidth: 1, // 선의 두께
        borderColor: colors.Gray100, // 선의 색상
        opacity: 0.5,
        marginHorizontal: 20,
    },

    keywordText: {
        alignSelf: 'flex-start',
        padding: 5, // 텍스트 주위의 여백
        paddingHorizontal: 12,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Gray500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 13, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        marginTop: '2%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: 50,
        // backgroundColor:'black',
        marginLeft: '2%',
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Gray900,
        width: '80%',
    },
    storeImg: {
        width: 95,
        height: 95,
        margin: '5%'
    },
    heartImg: {
        width: 23,
        height: 23,
    },
    pinImg: {
        width: 17,
        height: 17,
    },
    storeInfo: {
        alignSelf: 'flex-start',
        padding: 5, // 텍스트 주위의 여백
        paddingHorizontal: 15,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Green500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 13, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        fontSize: 13,
        marginTop: '2%',
    },
    storeName: {
        marginTop: '10%',
        fontSize: 16,
        // fontWeight: 'bold',

    }
});

export default SearchScreen;
