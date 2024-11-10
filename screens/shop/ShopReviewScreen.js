import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import ApiClient from '../auth/ApiClient';
import { ShopContext } from './ShopContext';
import colors from '../../config/colors';

const ShopReviewScreen = () => {
  const { selectedShopId } = useContext(ShopContext); // ShopContext에서 selectedShopId 가져옴
  const [reviews, setReviews] = useState([]); // 리뷰 목록
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부 확인

  // 리뷰 가져오는 함수
  const fetchReviews = async () => {
    if (isLoading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 종료
    setIsLoading(true);

    try {
      const response = await ApiClient.get(`/api/reviews?poomShopId=${selectedShopId}&limit=10&page=${page}`);
      const data = response.data.response;

      if (response.data.success) {
        setReviews((prevReviews) => [...prevReviews, ...data.reviews]); // 기존 리뷰에 새 리뷰 추가
        setHasMore(data.reviews.length > 0); // 데이터가 더 있는지 여부 확인
        setPage(page + 1); // 다음 페이지 번호 증가
      }
    } catch (error) {
      console.error("리뷰 불러오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // 컴포넌트가 마운트될 때 리뷰 가져오기
  }, []);

  // 스크롤 끝에 도달하면 다음 페이지 로드
  const handleEndReached = () => {
    if (!isLoading && hasMore) {
      fetchReviews();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading && <ActivityIndicator size="small" color="#000" />}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <View style={styles.userContainer}>
              <Image source= {require('../../assets/profile.png')} style={{width : 40 , height : 40 , marginRight : 10, }}/>
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
                        // 모든 이미지를 볼 수 있는 화면으로 이동 로직 추가 가능
                      }}
                    >
                      <Image source={{ uri: img.url }} style={styles.reviewImage} />
                      <View style={styles.overlay}>
                        <Text style={styles.overlayText}>+{item.imgUrls.length - 2}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <Image key={img.id} source={{ uri: img.url }} style={styles.reviewImage} />
                  )
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor : colors.Ivory100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop : 2,
  },
  reviewContent: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop : 5,
  },
  recommendIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto', // 추천 아이콘을 오른쪽에 배치
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  reviewImage: {
    width: 167,
    height: 167,
    marginRight: 5,
    borderRadius : 4, 
  },
  overlayContainer: {
    position: 'relative',
    width: 60,
    height: 60,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopReviewScreen;
