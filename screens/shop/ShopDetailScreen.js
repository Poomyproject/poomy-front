import React , {useContext , useState , useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from './ShopContext';
import ApiClient from '../auth/ApiClient';
import { useFavorites } from '../like/FavoriteContext';
import { fonts } from '../../config/fonts';

const ShopDetailScreen = () => {
  const navigation = useNavigation();
  const { selectedShopId } = useContext(ShopContext);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [reviewData, setReviewData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await ApiClient.get(`/api/shop/${selectedShopId}`);
        setShopData(response.data.response);
      } catch (err) {
        console.error('API 요청 중 에러 발생:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedShopId) {
      fetchShopData();
    }
  }, [selectedShopId]);

  const fetchReviews = async (limit, page) => {
    try {
      console.log("Fetching reviews with selectedShopId:", selectedShopId); 
      const response = await ApiClient.get(`/api/reviews?poomShopId=${selectedShopId}&limit=${limit}&page=${page}`);
      if (response.data.success) {
        return response.data.response;
      } else {
        throw new Error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Review API Error:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const loadReviews = async () => {
      if (selectedShopId) { // selectedShopId가 존재할 때만 호출
        const data = await fetchReviews(limit, page);
        if (data) setReviewData(data);
      }
    };
    loadReviews();
  }, [selectedShopId, page]);

  const toggleFavorite = () => {
    isFavorite(selectedShopId) ? removeFavorite(selectedShopId) : addFavorite(selectedShopId);
  };

  const renderMoodAndSpotTags = () => (
    <View style={styles.tagContainer}>
      <Image source={require('../../assets/img_logo_symbol.png')} style={styles.symbol} />
      {shopData.mood ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{shopData.mood}</Text>
        </View>
      ) : (
        <Text>무드 정보 없음</Text>
      )}
      {shopData.spot ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{shopData.spot}</Text>
        </View>
      ) : (
        <Text>장소 정보 없음</Text>
      )}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color={colors.Green900} />;
  if (error) return <View><Text>에러 발생: {error.message}</Text></View>;

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: colors.Ivory100, alignItems: 'left', flexGrow: 1, padding: 20 }}>
      {shopData && shopData.shopImageList && shopData.shopImageList.length > 0 ? (
        <Swiper style={styles.swiper} showsPagination dotColor="#D4D4D4" activeDotColor="#666666">
          {shopData.shopImageList.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image.url }} style={styles.shopImage} />
            </View>
          ))}
        </Swiper>
      ) : (
        <Image source={require('../../assets/photo.png')} style={styles.shopImage} />
      )}

      <View style={styles.header}>
        {shopData ? (
          <>
            <Text style={styles.shopName}>{shopData.name || '이름 없음'}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image 
                source={isFavorite(selectedShopId) ? require('../../assets/img_liked_heart.png') : require('../../assets/heart.png')}
                style={styles.like}
              />
            </TouchableOpacity>
          </>
        ) : (
          <Text>상점 이름 없음</Text>
        )}
      </View>

      {shopData && (
        <>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_clock.png')} style={styles.icon} />
              <Text style={styles.infoText}>{shopData.openingHours || '영업시간 정보 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_phone.png')} style={styles.icon} />
              <Text style={styles.infoText}>{shopData.phoneNumber || '번호 정보 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_mappin.png')} style={styles.icon} />
              <Text style={styles.infoText}>
                {shopData.location || '위치 정보 없음'}{'\n'}{shopData.nearbyStation || '인근 지하철 정보 없음'}
              </Text>
            </View>
          </View>

          {renderMoodAndSpotTags()}
          <Image source={require('../../assets/img_map.png')} style={{ marginTop: 10 }} />
        </>
      )}

      <View style={styles.divider} />

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate('UserReview1', { screen: 'UserReview1', selectedShopId })}
      >
        <Text style={styles.shopName}>리뷰</Text>
        <Image source={require('../../assets/edit.png')} style={{ marginLeft: 230 }} />
        <Text style={styles.infoText}>작성하기</Text>
      </TouchableOpacity>

      <View style={styles.reviewSection}>
        {reviewData ? (
          <>
            <Text style={styles.subTitle}>{reviewData.totalRecommend}명의 추천을 받은 소품샵이에요</Text>
            <View style={styles.imageRow}>
              {reviewData.imgUrls.slice(0, 3).map((img, index) => (
                <Image key={img.id} source={{ uri: img.url }} style={styles.reviewImage} />
              ))}
            </View>
            {reviewData.reviews.length > 0 ? (
              reviewData.reviews.map(review => (
                <View key={review.id} style={styles.reviewBox}>
                  <View style={styles.reviewItem}>
                    <Image source={{ uri: review.userImgUrl || require('../../assets/profile.png') }} style={styles.userImage} />
                    <View style={styles.reviewContent}>
                      <View style={styles.headerRow}>
                        <Text style={styles.reviewUser}>{review.userNickName}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                      <Text style={styles.reviewText}>{review.content}</Text>
                    </View>
                    <Image 
                      source={review.isRecommend ? require('../../assets/img_thumbs_up.png') : require('../../assets/img_thumbs_down.png')} 
                      style={styles.like} 
                    />
                  </View>
                </View>
              ))
            ) : (
            <View style={styles.noReviewContainer}>
              <Image 
                source={require('../../assets/img_review_none.png')} 
                style={styles.noneReviewImage} 
              />
              <Text style={styles.noReviewText}>등록된 리뷰가 없어요</Text>
            </View>
            )}
          </>
        ) : (
          <Text>리뷰 데이터를 불러오는 중입니다...</Text>
        )}
      </View>

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>리뷰 전체보기</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      {renderMoodAndSpotTags()}

      <View style={styles.recommendSection}>  
        <Text style={styles.subTitle}>소품샵 추천</Text>
        <View style={styles.shopRecommendationRow}>
          <View style={styles.shopRecommendation}>
            <Image source={require('../../assets/img_sample.png')} style={styles.recommendImage} />
            <Text style={styles.shopName}>선민이네 샵</Text>
          </View>
          <View style={styles.shopRecommendation}>
            <Image source={require('../../assets/img_sample.png')} style={styles.recommendImage} />
            <Text style={styles.shopName}>선민이네 샵</Text>
          </View>
          <View style={styles.shopRecommendation}>
            <Image source={require('../../assets/img_sample.png')} style={styles.recommendImage} />
            <Text style={styles.shopName}>선민이네 샵</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

 const styles = StyleSheet.create({
    container : {
        flexGrow : 1,
        marginTop : 10, 
        alignItems : 'center',
        backgroundColor : colors.Ivory100
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 380,
        marginBottom: 10,
        marginTop : 10,
      },
      swiper: {
        height: 200,  // Swiper의 높이 조정
      },
      slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      shopImage: {
        width: '100%',  // 부모 너비에 맞춤 (match_parent)
        height: 168,    // 세로는 고정된 168
        resizeMode: 'cover',  // 이미지가 잘리지 않도록 커버
        borderRadius: 4,
      },
      pagination: {
        bottom: -5,  // 점을 이미지 아래로 배치
      },
      icon: {
        width: 20, 
        height: 20, 
        resizeMode: 'contain', // 이미지의 크기 조정 모드
      },
      shopName: {
        color : colors.Gray900,
        ...fonts.Title2
      },
      like:{
        marginEnd : 30, 
        width: 24, 
        height: 24, 
      },
      infoContainer: {
        marginTop: 10,
        alignItems: 'flex-start', // 왼쪽 정렬
        width: '90%', // 전체 화면의 90%에 맞추기 (너무 넓어지지 않도록 제한)
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        flexWrap: 'wrap', // 긴 텍스트가 있을 경우 자동으로 줄바꿈되도록 설정
      },
      infoText: {
        color: colors.Gray700,
        ...fonts.Body4,
        marginLeft: 8,
        flex: 1, 
        flexWrap: 'wrap', 
      },
      tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',  // 왼쪽 정렬
        alignItems: 'center',  // 수직 가운데 정렬
        marginTop: 5,
      },
      tag: {
        backgroundColor: colors.Ivory100,
        borderRadius: 24,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
        borderColor: colors.Green900,
        borderWidth: 1,
        flexDirection: 'row',  // 아이콘과 텍스트를 같은 줄에 배치
        alignItems: 'center',  // 아이콘과 텍스트 수직 가운데 정렬
      },
      tagText: {
        color: colors.Green900,
        ...fonts.Body3,
      },
      symbol: {
        width: 20,
        height: 20,
        marginRight: 5,
      }, 
      divider: {
        height: 1, // 라인의 높이
        backgroundColor: colors.Gray300, // 라인의 색상
        marginVertical: 10, // 위아래 간격을 추가하여 공간 확보
        width: '100%', // 라인이 전체 너비를 차지하게 설정
      },
      //여기서부터 리뷰 css     
      review : {
        justifyContent: 'center',
        alignItems: 'center',
      },
      reviewSection: {
        marginTop: 20,
        justifyContent: 'center',
      },
      subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      imageRow: {
        flexDirection: 'row',
        marginBottom: 15,
      },
      reviewImage: {
        width: 108,
        height: 108,
        marginRight: 10,
        borderRadius: 4,
      },

      reviewBox: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
      },
      
      reviewItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      
      userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      
      reviewContent: {
        flex: 1,
      },
      headerRow: {
        marginBottom: 4,
      },
      reviewUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 6,
        marginTop : 5,
      },
      
      reviewDate: {
        fontSize: 12,
        marginTop : 3,
        color: '#999999',
      },
      
      reviewText: {
        fontSize: 14,
        color: '#333333',
        marginTop: 10,
        marginLeft : - 46, 
      },
      
      like: {
        width: 20,
        height: 20,
        tintColor: '#32CD32',
        marginLeft: 8,
        alignSelf: 'flex-start',
      },
      
      extraImageRow: {
        flexDirection: 'row',
        marginTop: 10,
      },
      extraImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
      },
      viewAllButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
      },
      viewAllText: {
        fontSize: 14,
        color: colors.Gray700,
      },
      recommendSection: {
        marginTop: 20,
      },
      shopRecommendationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      shopRecommendation: {
        width: 90,
        alignItems: 'center',
        marginRight : 30 , 
      },
      recommendImage: {
        width: 108,
        height: 108,
        borderRadius: 4,
        marginBottom: 5, 
        marginLeft : 14, 
      },
      noReviewContainer: {
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        padding: 10, // 상하좌우 여백 (선택 사항)
      },
      noneReviewImage: {
        width: 130, // 원하는 너비
        height: 130, // 원하는 높이
        resizeMode: 'contain', // 이미지 크기 비율을 유지
      },
      noReviewText: {
        marginTop: 10, // 이미지와 텍스트 사이의 간격
        fontSize: 16, // 텍스트 크기
        color: '#888', // 텍스트 색상 (예: 회색)
      },
 })

export default ShopDetailScreen;