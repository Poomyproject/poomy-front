import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import styles from './styles';
import KeywordList from './KeywordList';
import SearchRankings from './SearchRankings';
import { showToast } from './toastHelper';
import { SearchContext } from '../context/SearchContext';
import ApiClient from '../auth/ApiClient';  // ApiClient 경로 맞게 사용
import HighlightText from './HighlightText';

const SearchScreen = ({ navigation }) => {
    const { setSelectedWord } = useContext(SearchContext);
    const [searchText, setSearchText] = useState(''); // TextInput의 텍스트 상태 추가
    const [autoCompleteResults, setAutoCompleteResults] = useState([]); // 연관 검색어 결과 상태

    // 검색버튼(돋보기)이나 엔터키에서 호출되는 함수
    const handleSearch = () => {
        setSelectedWord(searchText); // 컨텍스트에 선택된 단어 설정
        navigation.navigate('SearchStack', { screen: 'SearchResult', params: { SearchWord: searchText } });
    };
    // 연관검색어 클릭시 호출되는 함수
    const handleRelatedSearch = (word) => {
        setSelectedWord(word); // 연관검색어 단어를 컨텍스트에 설정
        navigation.navigate('SearchStack', { screen: 'SearchResult', params: { SearchWord: word } });
    };
    // 검색어가 변경될 때마다 호출되는 함수
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        fetchAutoCompleteResults(text); // 검색어가 변경될 때마다 연관 검색어를 가져옴
    };


    // 검색어에 대한 연관 검색어를 가져오는 함수
    const fetchAutoCompleteResults = async (searchText) => {
        if (searchText.trim() === '') {
            setAutoCompleteResults([]); // 검색어가 비어있으면 연관 검색어를 비우기
            return;
        }

        try {
            const response = await ApiClient.get(`/api/search/autoComplete?word=${encodeURIComponent(searchText)}`);
            if (response.data.success) {
                setAutoCompleteResults(response.data.response); // 연관 검색어를 상태에 저장
            } else {
                console.error('연관 검색어를 불러올 수 없습니다.');
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
        }
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
                        onChangeText={handleSearchTextChange}
                        // onChangeText={setSearchText}
                        onSubmitEditing={handleSearch} // 엔터 키 입력 시 handleSearch 실행
                    />

                    {/* 돋보기 버튼 */}
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={require('../../assets/search_img.png')} style={styles.searchImg} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* TextInput 비어있지 않으면 연관검색어, 비어있으면 키워드,랭킹 */}
            {searchText.trim() !== '' ? (
                // 연관 검색어 리스트
                <FlatList
                    data={autoCompleteResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            // setSearchText(item.name);
                            handleRelatedSearch(item.name);
                        }
                        }>
                            <HighlightText text={item.name} highlight={searchText} />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                // 검색어가 비어있으면 아래 두 컴포넌트 보여주기
                <>
                    <KeywordList onInfoPress={showToast} />
                    <SearchRankings />
                </>
            )}
        </View>
    );
};

export default SearchScreen;
