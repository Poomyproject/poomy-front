import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ApiClient from '../auth/ApiClient';

const ReviewPictureScreen = ({ route }) => {
  const { poomShopId } = route.params;
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalImgUrl, setTotalImgUrl] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await ApiClient.get(`/api/reviews/imgs?poomShopId=${poomShopId}&limit=20&page=1`);
        if (response.data.success) {
          setImgUrls(response.data.response.imgUrls);
          setTotalImgUrl(response.data.response.totalImgUrl);
        } else {
          console.error("Failed to load images");
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [poomShopId]);

  console.log('imgUrls data:', imgUrls);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={imgUrls}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // 한 줄에 3개의 이미지를 표시
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '33.33%', // 화면의 1/3 너비를 차지하도록 설정
    aspectRatio: 1, // 정사각형 비율 유지
    padding: 4, // 이미지 간격을 위한 패딩 추가
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 4,
  },
});

export default ReviewPictureScreen;
