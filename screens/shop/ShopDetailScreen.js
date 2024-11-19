import React , {useContext , useState , useEffect , useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator,Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import colors from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from './ShopContext';
import ApiClient from '../auth/ApiClient';
import FavoriteProvider, { FavoriteContext } from '../like/FavoriteContext';
import { fonts } from '../../config/fonts';
import { NaverMapView, Marker } from '@mj-studio/react-native-naver-map';

//영업시간 처리_기기시간 기준
const OpeningHoursComponent = ({ openingHours }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parsedHours, setParsedHours] = useState([]);
  const todayIndex = new Date().getDay(); // 0: 일요일, 1: 월요일, ... , 6: 토요일

  useEffect(() => {
    const parseOpeningHours = (data) => {
      const lines = data.split("\n");
      return lines.map(line => {
        const [day, ...time] = line.split(" ");
        return { day, time: time.join(" ") };
      });
    };

    const schedule = parseOpeningHours(openingHours);

    // 현재 요일이 최상단에 위치하게 정렬
    const sortedData = [
      ...schedule.slice(todayIndex),
      ...schedule.slice(0, todayIndex)
    ];

    setParsedHours(sortedData);
  }, [openingHours]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
<View>
  {parsedHours.length > 0 && (
    <>
      {/* 같은 행에 배치 */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* 시계 이미지 */}
        <Image 
          source={require('../../assets/icon_clock.png')} 
          style={{ width: 20, height: 20, marginRight: 8 }} 
        />

        {/* 현재 요일 */}
        <Text style={[styles.infoText, { marginLeft: -3}]}>
          {`${parsedHours[0].day} ${parsedHours[0].time}`}
        </Text>

        {/* 토글 버튼 */}
        <TouchableOpacity onPress={toggleExpanded} style={{ marginLeft: 4 }}>
          <Image
            source={
              isExpanded
                ? require('../../assets/img_toggle_down.png')
                : require('../../assets/icon_toggle_down.png')
            }
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* 나머지 요일: 토글 상태에 따라 표시 */}
      {isExpanded && parsedHours.slice(1).map((item, index) => (
        <Text key={index} style={[styles.infoText, { marginLeft: 25}]}>
          {`${item.day} ${item.time}`}
        </Text>
      ))}
    </>
  )}
</View>
  );
};

const ShopDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedShopId, setSelectedShopId } = useContext(ShopContext);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [reviewData, setReviewData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 3;
  const mapRef = useRef(null);
  const [recommendations, setRecommendations] = useState([]);
  const [moodId, setMoodId] = useState(null);
  const [spotId, setSpotId] = useState(null);
  const [totalImgUrl, setTotalImgUrl] = useState(0);

  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 병렬처리로 API 호출
        const fetchShopData = ApiClient.get(`/api/shop/${selectedShopId}`);
        const fetchMoodIds = ApiClient.get('/api/moods');
        const fetchSpotIds = ApiClient.get('/api/spots');
        
        const [shopResponse, moodResponse, spotResponse] = await Promise.all([
          fetchShopData,
          fetchMoodIds,
          fetchSpotIds,
        ]);

        // 상점 데이터 설정
        const shopDetails = shopResponse.data.response;
        setShopData(shopDetails);

        // 무드 및 장소 ID 매핑
        const moodMap = moodResponse.data.response.reduce((acc, mood) => {
          acc[mood.name] = mood.id;
          return acc;
        }, {});
        
        const spotMap = spotResponse.data.response.reduce((acc, spot) => {
          acc[spot.name] = spot.id;
          return acc;
        }, {});
        
        if (shopDetails.mood && moodMap[shopDetails.mood]) {
          setMoodId(moodMap[shopDetails.mood]);
        }

        if (shopDetails.spot && spotMap[shopDetails.spot]) {
          setSpotId(spotMap[shopDetails.spot]);
        }

        // 추천 상점 불러오기
        if (moodMap[shopDetails.mood] && spotMap[shopDetails.spot]) {
          const recommendationResponse = await ApiClient.get(`/api/keyword/mood/${moodMap[shopDetails.mood]}/spot/${spotMap[shopDetails.spot]}`);
          if (recommendationResponse.data && recommendationResponse.data.success) {
            setRecommendations(recommendationResponse.data.response);
          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedShopId) {
      fetchAllData();
    }
  }, [selectedShopId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const fetchReviews = ApiClient.get(`/api/reviews?poomShopId=${selectedShopId}&limit=${limit}&page=${page}`);
        const fetchImages = ApiClient.get(`/api/reviews/imgs?poomShopId=${selectedShopId}&limit=3&page=1`);
  
        const [reviewResponse, imageResponse] = await Promise.all([fetchReviews, fetchImages]);
  
        if (reviewResponse.data.success) {
          setReviewData(reviewResponse.data.response);
        }
  
        if (imageResponse.data.success) {
          setTotalImgUrl(imageResponse.data.response.totalImgUrl);
          setReviewData(prevData => ({
            ...prevData,
            imgUrls: imageResponse.data.response.imgUrls,
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (selectedShopId) {
      fetchData();
    }
  }, [selectedShopId, page]);
  

  const toggleFavorite = () => {
    isFavorite(selectedShopId) ? removeFavorite(selectedShopId) : addFavorite(selectedShopId);
  };

  const renderMoodAndSpotTags = () => (
    <View style={styles.tagContainer}>
      <Image source={require('../../assets/img_logo_symbol.png')} style={styles.symbol} />
      {shopData?.mood ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{shopData.mood}</Text>
        </View>
      ) : (
        <Text>무드 정보 없음</Text>
      )}
      {shopData?.spot ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{shopData.spot}</Text>
        </View>
      ) : (
        <Text>장소 정보 없음</Text>
      )}
    </View>
  );

  const handleShopPress = (shopId) => {
    setSelectedShopId(shopId); // or use directly from params if necessary
    navigation.navigate('ShopDetail', { shopId });
  };

  const navigateToOneReview = (reviewId) => {
    navigation.navigate('OneReview', { reviewId });
  };


  if (loading) return <ActivityIndicator size="large" color={colors.Green900} />;
  if (error) return <View><Text>에러 발생: {error.message}</Text></View>;

  return (
    <ScrollView 
    contentContainerStyle={{ backgroundColor: colors.Ivory100, alignItems: 'left', flexGrow: 1, padding: 20 , }}
    showsVerticalScrollIndicator={false}>
      {shopData && shopData.shopImageList && shopData.shopImageList.length > 0 ? (
        <Swiper style={styles.swiper} showsPagination dotColor="#D4D4D4" activeDotColor="#666666" paginationStyle={{ bottom: -5 }} >
          {shopData.shopImageList.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image.url }} style={styles.mainshopImage} />
            </View>
          ))}
        </Swiper>
      ) : (
        <Image source={require('../../assets/photo.png')} style={styles.mainshopImage} />
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
            {/* 영업시간 표시 영역 */}
            <View style={styles.infoRow}>
              {shopData.openingHours ? (
                <OpeningHoursComponent openingHours={shopData.openingHours} />
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('../../assets/icon_clock.png')} 
                  style={{ width: 20, height: 20, marginRight: 8 }} 
                />
                <Text style={[styles.infoText, { marginLeft: -2 }]}>영업시간 정보 없음</Text>
                </View>
              )}
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_phone.png')} style={styles.icon} />
              <Text style={styles.infoText}>{shopData.phoneNumber || '번호 정보 없음'}</Text>
            </View>
            <View style={styles.infoRow}>

            <View style={{ alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/img_mappin.png')} style={{ width: 20, height: 20, marginRight: 5 }} />
              
              {/* 위치 정보 */}
              <Text style={[styles.infoText, { marginLeft: -2 }]}>
                {shopData.location || '위치 정보 없음'}
              </Text>
            </View>

            {/* 줄 바꿈 및 인근 지하철 정보 */}
            <Text style={{ ...fonts.Body4, color: colors.Gray700, marginTop: 2 , marginLeft : 24 }}>
              {shopData.nearbyStation
                ? <>
                    {shopData.nearbyStation.split(/(.*?역)/).map((part, index) => (
                      part.endsWith('역') ? (
                        <Text key={index} style={{ color:"#0052A4"}}>{part}</Text>
                      ) : (
                        <Text key={index}>{part}</Text>
                      )
                    ))}
                  </>
                : '인근 지하철 정보 없음'}
            </Text>
          </View>
          </View>
          </View>  

         {/* NaverMapView */}
        <View style={{ marginTop: 0, width: '100%', height: 100 , marginBottom : 20,  }}>
        <NaverMapView
                ref={mapRef}
                style={{ flex: 1 }}
                mapType={'Basic'}
                layerGroups={{
                  BUILDING: true,
                  BICYCLE: false,
                  CADASTRAL: false,
                  MOUNTAIN: false,
                  TRAFFIC: false,
                  TRANSIT: false,
                }}
                camera={{
                  latitude: shopData.latitude,
                  longitude: shopData.longitude,
                  zoom: 19, // 초기 줌 레벨을 설정합니다.
                }}
                isNightModeEnabled={false}
                isShowCompass={true}
                isShowZoomControls={true}
                isShowLocationButton={true}
                logoAlign={'TopRight'}
                locale={'ko'}
                //onInitialized={() => console.log("Naver Map initialized")}
                //onCameraChanged={(args) => console.log(`Camera Changed: ${JSON.stringify(args)}`)}
                //onTapMap={(args) => console.log(`Map Tapped: ${JSON.stringify(args)}`)}
              >
              {/* 오버레이 마커 설정 */}
              {/* <NaverMapMarkerOverlay
                latitude={shopData.latitude}
                longitude={shopData.longitude}
                onTap={() => console.log("Overlay tapped!")}
                anchor={{ x: 0.5, y: 1 }}
                caption={{
                  text: shopData.name,
                  color: 'blue',
                }}
                subCaption={{
                  text: shopData.spot,
                  color: 'red',
                }}
                width={50}
                height={50}
              /> */}
        </NaverMapView>
        </View>

        {renderMoodAndSpotTags()}

            </>
          )}

      <View style={styles.divider} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Text style={styles.shopName}>리뷰</Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate('ReviewStack', { 
          screen: 'UserReview1', 
          params: { 
            selectedShopId, 
            shopName: shopData.name 
          } 
        })}
      >
        <Image source={require('../../assets/icon_edit.png')} style={{ height: 20, width: 20, marginRight: 8 }} />
        <Text style={styles.infoText}>작성하기</Text>
      </TouchableOpacity>
    </View>


      <View style={[styles.reviewSection, { width: '100%' }]}>
  {reviewData && reviewData.reviews?.length > 0 ? (
    <>
      <Text style={styles.subTitle}>{reviewData.totalRecommend}명의 추천을 받은 소품샵이에요</Text>
      <View style={styles.imageRow}>
      {reviewData?.imgUrls?.slice(0, 3).map((img, index) => (
        index === 2 ? (
          <TouchableOpacity 
            key={img.id} 
            onPress={() => navigation.navigate('ReviewPictures', { poomShopId: selectedShopId })} //리뷰 백엔드에서 품아이디로 해서 API 만듦_혼동주의
            style={styles.overlayContainer}
          >
            <Image source={{ uri: img.url }} style={styles.reviewImage} />
            {totalImgUrl > 3 && (
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>
                  +{Math.max(totalImgUrl - reviewData.imgUrls.length, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <Image key={img.id} source={{ uri: img.url }} style={styles.reviewImage} /> 
        )
      ))}
    </View>

    {reviewData.reviews.map((review) => (
  <TouchableOpacity 
    key={review.id} 
    style={styles.reviewBox}
    onPress={() => navigateToOneReview(review.id)} // 전체 리뷰 뷰를 누르면 이동
  >
    <View style={styles.reviewItem}>
      <Image source={require('../../assets/profile.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
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

    {/* 리뷰 이미지가 있을 경우 표시 */}
    {review.imgUrls && review.imgUrls.length > 0 && (
      <View style={styles.imageContainer}>
        {review.imgUrls.slice(0, 3).map((img, index) => (
          index === 2 && review.imgUrls.length > 3 ? (
            <View key={img.id} style={styles.overlayContainer}>
              <Image source={{ uri: img.url }} style={styles.bigReviewImage} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{review.imgUrls.length - 2}</Text>
              </View>
            </View>
          ) : (
            <Image key={img.id} source={{ uri: img.url }} style={styles.bigReviewImage} />
          )
        ))}
      </View>
    )}
  </TouchableOpacity>
))}



      <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('ShopReview')}>
        <Text style={styles.viewAllText}>리뷰 전체보기</Text>
        <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
      </TouchableOpacity>
    </>
  ) : (
    <View style={styles.noReviewContainer}>
      <Text style={styles.noReviewText}>{'\n'}아직 등록된 리뷰가 없어요. {'\n'}이 소품샵의 첫번째 리뷰를 작성해보세요. </Text>
    </View>
  )}
</View>

      <View style={styles.divider} />

      <View style={styles.recommendSection}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {renderMoodAndSpotTags()}
    <Text style={styles.subTitle}>소품샵 추천</Text>
    </View>
  
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.placeContainer4}
    >
      {recommendations
        .filter((shop) => shop.id !== selectedShopId) // selectedShopId와 다른 샵만 표시
        .map((shop) => (
          <TouchableOpacity key={shop.id} style={styles.lastView} onPress={() => handleShopPress(shop.id)}>
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
            <Text style={styles.lastshoptext} numberOfLines={1} ellipsizeMode="tail">
              {shop.name.length > 7 ? `${shop.name.substring(0, 7)}...` : shop.name}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>

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
        paddingRight : 25 , 
      },
      swiper: {
        height: 200,  // Swiper의 높이 조정
      },
      slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainshopImage: {
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
        marginEnd : 'flex-start',
        width: 24, 
        height: 24, 
      },
      infoContainer: {
        marginTop: 5,
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
        marginLeft: 6,
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
        height: 0.7,
        backgroundColor: colors.Gray200, 
        marginVertical: 20,
        width: '100%', 
      },
      //여기서부터 리뷰 css     
      review : {
        justifyContent: 'center',
        alignItems: 'center',
      },
      reviewSection: {
        width: '100%',
      },
      imageRow: {
        flexDirection: 'row',
        marginBottom: 15,
      },
      overlayContainer: {
        position: 'relative',
        borderRadius : 4,
      },
      overlayImage: {
        opacity: 0.7,
        borderRadius : 4,
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
        borderRadius : 4,
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
      imageContainer: {
        flexDirection: 'row',
        marginTop: 8,
      },
      bigReviewImage: {
        width: 167,
        height: 167,
        marginRight: 5,
        borderRadius: 4,
      },

      subTitle: {
        marginTop : 15 , 
        ...fonts.Body1,
        color : colors.Gray900,
        marginBottom : 10, 
      },

      reviewBox: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
      },
      
      reviewItem: {
        flexDirection: 'row',
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
      
      // like: {
      //   width: 20,
      //   height: 20,
      //   marginLeft: 8,
      //   alignSelf: 'flex-start',
      // },
      
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
        flexDirection: 'row',       // 텍스트와 아이콘을 가로로 정렬
        alignItems: 'center',       // 세로 중앙 정렬
        justifyContent: 'center',   // 가로 중앙 정렬
        paddingVertical: 10,
        width: '100%',  
      },
      viewAllText: {
        ...fonts.Body2,
        color: colors.Gray700,
        textAlign: 'center',
        marginRight: 5,             // 아이콘과 텍스트 사이 간격 추가
      },
      rightIcon: {
        width: 16,                  // 아이콘 너비
        height: 16,                 // 아이콘 높이
      },      
      recommendSection: {
        marginTop: 0,
      },
      shopRecommendationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : 14 , 
      },
      shopRecommendation: {
        width: 90,
        alignItems: 'center',
        marginRight : 30 , 
      },
      recommendshopName :{
        justifyContent:'flex-start',
        ...fonts.Body3,
        color: colors.Gray900,
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
        alignItems: 'flex-start', // 수평 중앙 정렬
        padding: 0, // 상하좌우 여백 (선택 사항)
        marginBottom : 10, 
      },
      // noneReviewImage: {
      //   width: 130, // 원하는 너비
      //   height: 130, // 원하는 높이
      //   resizeMode: 'contain', // 이미지 크기 비율을 유지
      // },
      noReviewText: {
        marginTop: 10, // 이미지와 텍스트 사이의 간격
        ...fonts.Body3,
        color : colors.Gray400,
      },
      placeContainer4: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
      },
      lastView: {
        marginTop: 0,
        height: 188,
        alignItems: 'flex-start',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.Gray100,
      },
      shopImage: {
        width: 144,
        height: 144,
      },
      lastshoptext: {
        marginLeft: 10,
        marginTop: 10,
        color: colors.Gray900,
        ...fonts.Body3,
      },
 })

export default ShopDetailScreen;