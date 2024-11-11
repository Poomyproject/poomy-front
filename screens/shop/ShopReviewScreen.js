import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import ApiClient from '../auth/ApiClient';
import { ShopContext } from './ShopContext';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import {fonts} from '../../config/fonts';

const ShopReviewScreen = () => {
  const { selectedShopId } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalImgUrl, setTotalImgUrl] = useState(0);
  const navigation = useNavigation();
  const limit = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchReviews = ApiClient.get(`/api/reviews?poomShopId=${selectedShopId}&limit=${limit}&page=${page}`);
        const fetchImages = ApiClient.get(`/api/reviews/imgs?poomShopId=${selectedShopId}&limit=3&page=1`);
        const [reviewResponse, imageResponse] = await Promise.all([fetchReviews, fetchImages]);

        if (reviewResponse.data.success) {
          setReviewData(reviewResponse.data.response);
          setReviews((prevReviews) => [...prevReviews, ...reviewResponse.data.response.reviews]);
          setHasMore(reviewResponse.data.response.reviews.length > 0);
        }

        if (imageResponse.data.success) {
          setTotalImgUrl(imageResponse.data.response.totalImgUrl);
          setReviewData((prevData) => ({
            ...prevData,
            imgUrls: imageResponse.data.response.imgUrls,
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedShopId) {
      fetchData();
    }
  }, [selectedShopId, page]);

  const handleEndReached = () => {
    if (!isLoading && hasMore) {
      setPage(page + 1);
    }
  };

  // `FlatList`의 상단에 이미지 행을 렌더링하는 함수
  const renderHeader = () => (
    <View style={styles.imageRow}>
      {reviewData?.imgUrls?.slice(0, 3).map((img, index) => (
        index === 2 ? (
          <TouchableOpacity 
            key={img.id} 
            onPress={() => navigation.navigate('ReviewPictures', { poomShopId: selectedShopId })}
            style={styles.overlayContainer}
          >
            <Image source={{ uri: img.url }} style={styles.reviewImage} />
            {totalImgUrl > 3 && (
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>
                  +{totalImgUrl - reviewData.imgUrls.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <Image key={img.id} source={{ uri: img.url }} style={styles.reviewImage} /> 
        )
      ))}
    </View>
  );

  const navigateToOneReview = (reviewId) => {
    navigation.navigate('OneReview', { reviewId });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' , marginBottom : 10, }}>
      <Text style={{ ...fonts.Body1, color: colors.Gray900,}}>전체 리뷰 사진</Text>
      <Text style={{ ...fonts.Body1, color: colors.Green900, marginLeft: 4}}>{totalImgUrl}</Text>
    </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false} // 세로 스크롤바 숨기기
        ListFooterComponent={isLoading && <ActivityIndicator size="small" color="#000" />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToOneReview(item.id)}>
          <View style={styles.reviewContainer}>
            <View style={styles.userContainer}>
              <Image source={require('../../assets/profile.png')} style={styles.userImage}/>
              <View>
                <Text style={styles.userName}>{item.userNickName}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <Image
                source={item.isRecommend ? require('../../assets/img_thumbs_up.png') : require('../../assets/img_thumbs_down.png')}
                style={styles.recommendIcon}
              />
            </View>
            <Text style={styles.reviewContent}>{item.content}</Text>
            {item.imgUrls && item.imgUrls.length > 0 && (
              <View style={styles.imageContainer}>
                {item.imgUrls.slice(0, 3).map((img, index) => (
                  index === 2 && item.imgUrls.length > 3 ? (
                    <TouchableOpacity
                      key={img.id}
                      style={styles.overlayContainer}
                      onPress={() => {
                      }}
                    >
                      <Image source={{ uri: img.url }} style={styles.bigReviewImage} />
                      <View style={styles.overlay}>
                        <Text style={styles.overlayText}>+{item.imgUrls.length - 2}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <Image key={img.id} source={{ uri: img.url }} style={styles.bigReviewImage} />
                  )
                ))}
              </View>
            )}
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.Ivory100,
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  overlayContainer: {
    position: 'relative',
    borderRadius: 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewImage: {
    width: 108,
    height: 108,
    marginRight: 10,
    borderRadius: 4,
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginTop : 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bigReviewImage : {
    width: 167,
    height: 167,
  borderRadius : 4,
  marginRight : 10, 
  marginLeft : 2,

  },
  userName: {
    ...fonts.Body1,
    color : colors.Gray900,
    marginTop : 2, 
  },
  reviewContent: {
    ...fonts.Body4,
    color : colors.Gray900,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.Gray500,
    marginTop: 5,
  },
  recommendIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default ShopReviewScreen;
