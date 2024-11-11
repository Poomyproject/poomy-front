import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import colors from '../../config/colors';
import styles from './styles';
import ApiClient from '../auth/ApiClient';
import HighlightedText from './HighlightedText';
import { useFavorites } from '../like/FavoriteContext';
import { ShopContext } from '../shop/ShopContext';
import NoResults from './NoResults';

const SearchResultScreen = ({ route, navigation }) => {
  const { SearchWord } = route.params;
  const [text, setText] = useState(SearchWord); // 초기값을 상태로 설정
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
  const { setSelectedShopId } = useContext(ShopContext);

  // FavoriteContext에서 필요한 함수와 상태 불러오기
  const { isFavorite, handleFavoriteToggle } = useFavorites();

  // 검색 결과 api
  const fetchSearchResults = async (searchText) => {
    try {
      const response = await ApiClient.get(`/api/search?word=${encodeURIComponent(SearchWord)}`);
      if (response.data.success) {
        setSearchResults(response.data.response); // 검색 결과를 상태에 저장
        console.log(response.data.response);
      } else {
        console.error('검색 결과를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchSearchResults(text); // 초기값을 기반으로 API 호출
  }, []);

  // count 증가시키는 함수
  const incrementSearchCount = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/search/${shopId}`);
      if (response.data.success) {
        console.log(`Search count incremented for shopId: ${shopId}`);
      } else {
        console.error('카운트를 증가시킬 수 없습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

    // 상세페이지로 네비게이션
    const handleShopPress = (shopId) => {
      incrementSearchCount(shopId); // shopId에 대한 count 증가
      setSelectedShopId(shopId);
      navigation.navigate('ShopDetail', { shopId });
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
            style={styles.SearchWord}
            value={text} // 상태로 관리되는 값 설정
            onChangeText={setText} // 텍스트 변경 시 상태 업데이트
            placeholderTextColor={colors.Gray900}
          />
          {/* X버튼 */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.imageContainer}>
            <Image
              source={require('../../assets/86-close.png')}
              style={styles.XImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 검색 결과 리스트 */}
      {searchResults.length === 0 ? (
         <NoResults />
      ) : ( <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.ResultContainer} onPress={() => handleShopPress(item.id)}>

            {/* 소품샵 이미지 */}
            <Image source={{ uri: item.image }} style={styles.storeImg} />
            <View style={{ width: '55%' }}>

              {/* 소품샵 이름 */}
              <HighlightedText text={item.name} highlight={SearchWord} />

              {/* 소품샵 태그(이름,테마) */}
              <View style={styles.storeDetails}>
                <Text style={styles.storeInfo}>{item.spot}</Text>
                <Text style={[styles.storeInfo, { marginLeft: 5 }]}>{item.mood}</Text>
              </View>

              {/* 소품샵 상세 위치 */}
              <View style={styles.addressContainer}>
                <Image source={require('../../assets/map-pin.png')} style={styles.pinImg} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
                  {item.location}
                </Text>
              </View>
            </View>

            {/* 찜 버튼 */}
            <TouchableOpacity
              style={styles.heartContainer}
              onPress={() => handleFavoriteToggle(item.id)} // 찜 상태 토글
            >
              <Image
                source={
                  isFavorite(item.id) // 찜 상태에 따라 이미지 변경
                    ? require('../../assets/img_liked_heart.png')
                    : require('../../assets/heart.png')
                }
                style={styles.heartImg}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      )}
    </View>
  );
};

export default SearchResultScreen;