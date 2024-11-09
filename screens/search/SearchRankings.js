import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import ApiClient from '../../screens/auth/ApiClient'; // ApiClient 가져오기
import styles from './styles'; // styles 가져오기
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ShopContext } from '../shop/ShopContext';
import { useNavigation } from '@react-navigation/native';

const SearchRankings = () => {
    const [searchRankings, setSearchRankings] = useState([]);
    const [error, setError] = useState(null);
    const { setSelectedShopId } = useContext(ShopContext);
    const navigation = useNavigation();


    // API에서 상위 5개의 랭킹 데이터를 불러오는 함수
    const fetchTopFiveRankings = async () => {
        try {
            const response = await ApiClient.get('/api/search/topFive');
            if (response.data.success) {
                setSearchRankings(response.data.response); // 성공 시 랭킹 데이터 저장
            } else {
                throw new Error('랭킹 데이터를 불러오지 못했습니다.');
            }
        } catch (err) {
            console.error('Error fetching top five rankings:', err);
            setError(err);
            Alert.alert('데이터 로딩 실패', '상위 5개 랭킹 데이터를 불러오는 데 실패했습니다.');
        }
    };

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        fetchTopFiveRankings();
    }, []);

    // 상세페이지로 네비게이션
    const handleShopPress = (shopId) => {
        setSelectedShopId(shopId);
        navigation.navigate('ShopDetail', { shopId });
    };


    return (
        <View>
            {searchRankings.map((item, index) => (
                <React.Fragment key={item.id}>
                    <TouchableOpacity style={styles.searchRankingItem} onPress={() => handleShopPress(item.id)}>
                        <Text style={styles.number}>{index + 1}</Text>
                        <Text style={styles.searchRankText}>{item.name}</Text>
                    </TouchableOpacity>
                    <Image source={require('../../assets/Newsline.png')} style={styles.line} />
                </React.Fragment>
            ))}
        </View>
    );
};

export default SearchRankings;
