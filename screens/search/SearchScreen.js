import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { stores } from './storesData';
import styles from './styles';
import KeywordList from './KeywordList';
import SearchResultItem from './SearchResultItem';
import SearchRankings from './SearchRankings';
import { showToast } from './toastHelper';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredStores, setFilteredStores] = useState([]);
    const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);

    const searchFilterFunction = () => {
        const newData = searchText 
            ? stores.filter((item) => item.name?.toUpperCase().includes(searchText.toUpperCase())) 
            : stores;
        setFilteredStores(newData);
        setIsSearchResultsVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={{ marginTop: "3%" }}>
                    <Image source={require('../../assets/top_bar.png')} style={styles.leftArrow} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="내가 찾는 소품샵 이름을 검색해보세요."
                    onChangeText={setSearchText}
                    value={searchText}
                />
                <TouchableOpacity onPress={searchFilterFunction}>
                    <Image source={require('../../assets/search_img.png')} style={styles.searchImg} />
                </TouchableOpacity>
            </View>

            {!isSearchResultsVisible ? (
                <>
                    <KeywordList onInfoPress={showToast} />
                    <SearchRankings />
                </>
            ) : (
                <FlatList
                    data={filteredStores}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <SearchResultItem item={item} />}
                />
            )}
        </View>
    );
};

export default SearchScreen;
