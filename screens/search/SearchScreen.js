import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import KeywordList from './KeywordList';
import SearchRankings from './SearchRankings';
import { showToast } from './toastHelper';
import { SearchContext } from '../context/SearchContext';

const SearchScreen = ({ navigation }) => {
    const { setSelectedWord } = useContext(SearchContext);
    const [searchText, setSearchText] = useState(''); // TextInput의 텍스트 상태 추가

    // 뉴스레터 상세페이지로 네비게이션 시 정보 넘기기
    const handleSearch = () => {
        setSelectedWord(searchText); // 컨텍스트에 선택된 단어 설정
        navigation.navigate('SearchStack', { screen: 'SearchResult', params: { SearchWord: searchText } });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                {/* 뒤로가기 버튼 */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: "3%" }}>
                    <Image source={require('../../assets/top_bar.png')} style={styles.leftArrow} />
                </TouchableOpacity>

                {/* 검색바 */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="내가 찾는 소품샵 이름을 검색해보세요."
                        value={searchText} 
                        onChangeText={setSearchText} 
                        onSubmitEditing={handleSearch} // 엔터 키 입력 시 handleSearch 실행
                    />

                    {/* 돋보기 버튼 */}
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={require('../../assets/search_img.png')} style={styles.searchImg} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeywordList onInfoPress={showToast} />
            <SearchRankings />
        </View>
    );
};

export default SearchScreen;
