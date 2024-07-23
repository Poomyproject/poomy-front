import React, { useState } from 'react';
import { TextInput, FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { stores, searchRankings } from './storesData';

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


                <View horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }} />
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>아기자기한</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>모던</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>빈티지</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>럭셔리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.keword_text}>테마별</Text>
                    </TouchableOpacity>
                </View>


            </View>
            {isSearchResultsVisible ? (
                <FlatList
                    data={filteredStores}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item.name}</Text>
                    )}
                />
            ) : (
                <FlatList
                    data={searchRankings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item}</Text>
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
        backgroundColor: 'white',
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
        backgroundColor: '#F8F7F2',
        borderRadius: 10,
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    searchButtonText: {
        color: '#fff',
    },
    itemText: {
        padding: 10,
    },
    keword_text: {
        alignSelf: 'flex-start',
        padding: 5, // 텍스트 주위의 여백
        paddingHorizontal: 13,
        borderWidth: 1, // 테두리 두께
        borderColor: '#79CCA4', // 테두리 색상
        color: '#666666',
        borderRadius: 13, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
        height: 50,
        // backgroundColor:'black',
    },
});

export default SearchScreen;
