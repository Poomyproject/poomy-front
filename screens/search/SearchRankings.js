import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import ApiClient from '../../screens/auth/ApiClient'; // ApiClient 가져오기
import styles from './styles'; // styles 가져오기

const SearchRankings = () => {
    const [searchRankings, setSearchRankings] = useState([]);
    const [error, setError] = useState(null);

    // API에서 상위 5개의 랭킹 데이터를 불러오는 함수
    // const fetchTopFiveRankings = async () => {
    //     try {
    //         const response = await ApiClient.get('/api/search/topFive');
    //         if (response.data.success) {
    //             setSearchRankings(response.data.response); // 성공 시 랭킹 데이터 저장
    //         } else {
    //             throw new Error('랭킹 데이터를 불러오지 못했습니다.');
    //         }
    //     } catch (err) {
    //         console.error('Error fetching top five rankings:', err);
    //         setError(err);
    //         Alert.alert('데이터 로딩 실패', '상위 5개 랭킹 데이터를 불러오는 데 실패했습니다.');
    //     }
    // };

    // 컴포넌트가 마운트될 때 API 호출
    // useEffect(() => {
    //     fetchTopFiveRankings();
    // }, []);

    return (
        // <FlatList
        //     data={searchRankings}
        //     keyExtractor={(item) => item.id.toString()}
        //     renderItem={({ item }) => (
        //         <View style={styles.searchRankingItem}>
        //             <Text style={styles.number}>{item.id}</Text>
        //             <Text style={styles.searchRankText}>{item.name}</Text>
        //             <View style={styles.separator} />
        //         </View>
        //     )}
        // />
        <Text>랭킹 정보</Text>
    );
};

export default SearchRankings;
