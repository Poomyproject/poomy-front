import React , {useContext , useState , useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // 아이콘 사용
import Swiper from 'react-native-swiper';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts'; 
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from './ShopContext';
import ApiClient from '../auth/ApiClient';
import { ActivityIndicator } from 'react-native-paper';
import { useFavorites } from '../like/FavoriteContext';

const ShopDetailScreen = () => {
  const navigation = useNavigation();
  const { selectedShopId } = useContext(ShopContext); // ShopContext에서 shopId를 가져옴
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites(); // 찜 관련 함수 가져오기


  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await ApiClient.get(`/api/shop/${selectedShopId}`); // shopId를 이용해 API 호출
        setShopData(response.data.response);  // API 응답 데이터를 상태에 저장

        // 데이터 로그 출력
        console.log('API 응답:', response.data);
        
      } catch (err) {
        console.error('API 요청 중 에러 발생:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedShopId) {
      fetchShopData(); // selectedShopId가 존재할 때만 API 호출
    }
  }, [selectedShopId]);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.Green900} />;
  }

  if (error) {
    return (
      <View>
        <Text>에러 발생: {error.message}</Text>
      </View>
    );
  }

    // 찜 여부를 확인하여 이미지 토글 및 토글 함수 실행
    const toggleFavorite = () => {
      if (isFavorite(selectedShopId)) {
        removeFavorite(selectedShopId);
      } else {
        addFavorite(selectedShopId);
      }
    };
  

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: colors.Ivory100, alignItems: 'left', flexGrow: 1 , padding : 20, }}>
      {shopData && shopData.shopImageList && shopData.shopImageList.length > 0 ? (
        <Swiper 
          style={styles.swiper} 
          showsPagination={true} 
          dotColor="#D4D4D4" // 기본 점 색상
          activeDotColor="#666666"  // 활성 점 색상
          paginationStyle={styles.pagination}  // 점의 위치 조정
        >
          {shopData.shopImageList.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image 
                source={{ uri: image.url }}  // 각 이미지의 URL을 사용
                style={styles.shopImage}
              />
            </View>
          ))}
        </Swiper>
      ) : (
        <Image 
          source={require('../../assets/photo.png')}  // 기본 이미지
          style={styles.shopImage}
        />
      )}

      <View style={styles.header}>
        {shopData ? (
          <>
            <Text style={styles.shopName}>{shopData.name || '이름 없음'}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Image 
                source={isFavorite(selectedShopId)
                  ? require('../../assets/img_liked_heart.png') // 찜 상태일 때 이미지
                  : require('../../assets/heart.png') // 찜 상태가 아닐 때 이미지
                }
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
              <Text style={styles.infoText}>{shopData.openingHours ? shopData.openingHours : '영업시간 정보 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_phone.png')} style={styles.icon} />
              <Text style={styles.infoText}>{shopData.phoneNumber ? shopData.phoneNumber : '번호 정보 없음'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image source={require('../../assets/img_mappin.png')} style={styles.icon} />
              <Text style={styles.infoText}>
                {shopData.location ? shopData.location : '위치 정보 없음'}
                {'\n'}{shopData.nearbyStation ? shopData.nearbyStation : '인근 지하철 정보 없음'}
              </Text>
            </View>
          </View>

          {/* mood와 spot 데이터를 라운드 박스 내에 할당 */}
          <View style={styles.tagContainer}>
          <Image source={require('../../assets/img_logo_symbol.png')} style = {styles.symbol}></Image>
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
          <Image source={require('../../assets/img_map.png')} style={{ marginTop: 10 }} />
        </>
      )}

<View style={styles.divider} />

<TouchableOpacity
  style={{ flexDirection: 'row', alignItems: 'center' }}
  onPress={() => navigation.navigate('UserReview1', { screen: 'UserReview1', selectedShopId })} // selectedShopId를 함께 전달
>
  <Text style={styles.shopName}>리뷰</Text>
  <Image source={require('../../assets/edit.png')} style={{ marginLeft: 230 }} />
  <Text style={styles.infoText}>작성하기</Text>
</TouchableOpacity>

<View style={styles.reviewSection}>
  <Text style={styles.subTitle}>13명의 추천을 받은 소품샵이에요</Text>

  {/* 이미지 및 리뷰 상단 */}
  <View style={styles.imageRow}>
    <Image source={require('../../assets/img_sample.png')} style={styles.reviewImage} />
    <Image source={require('../../assets/img_sample.png')} style={styles.reviewImage} />
    <Image source={require('../../assets/img_sample.png')} style={styles.reviewImage} />
    <View style={styles.moreImages}>
      <Text style={styles.moreText}>+10</Text>
    </View>
  </View>

  {/* 리뷰 리스트 */}
  <View style={styles.reviewBox}>
    <View style={styles.reviewItem}>
      <Image source={require('../../assets/img_user_sample.png')} style={styles.userImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewUser}>민지</Text>
        <Text style={styles.reviewDate}>2024.07.11</Text>
        <Text style={styles.reviewText}>사장님이 너무 친절했어요! TTT 그립지만 좋아하는 카페에 물품이 많아서 구경하기 너무 좋았어요~</Text>
      </View>
      <Image source={require('../../assets/heart.png')} style={styles.like}/>
    </View>

    <View style={styles.reviewItem}>
      <Image source={require('../../assets/img_user_sample.png')} style={styles.userImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewUser}>해강</Text>
        <Text style={styles.reviewDate}>2024.07.11</Text>
        <Text style={styles.reviewText}>아기자기한 소품들이 많고 예뻐서 구경하는 데 시간 가는 줄 몰랐습니다! 꿀!</Text>
      </View>
      <FontAwesome name="thumbs-o-up" size={24} color={colors.Green500} />
    </View>

    {/* 추가 이미지가 있는 리뷰 */}
    <View style={styles.reviewItem}>
      <Image source={require('../../assets/img_user_sample.png')} style={styles.userImage} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewUser}>민지</Text>
        <Text style={styles.reviewDate}>2024.07.11</Text>
        <Text style={styles.reviewText}>사장님이 너무 친절했어요! TTT 그립지만 좋아하는 카페에 물품이 많아서 구경하기 너무 좋았어요~</Text>
        <View style={styles.extraImageRow}>
          <Image source={require('../../assets/img_user_sample.png')} style={styles.extraImage} />
          <View style={styles.moreImages}>
            <Text style={styles.moreText}>+2</Text>
          </View>
        </View>
      </View>
      <FontAwesome name="heart-o" size={24} color={colors.Gray500} />
    </View>
  </View>

  <TouchableOpacity style={styles.viewAllButton}>
    <Text style={styles.viewAllText}>리뷰 전체보기</Text>
  </TouchableOpacity>
</View>

{/* 소품샵 추천 */}
<View style={styles.recommendSection}>
  <View style={styles.chipRow}>
    <View style={styles.chip}>
      <Text style={styles.chipText}>이태원</Text>
    </View>
    <View style={styles.chip}>
      <Text style={styles.chipText}>홍대</Text>
    </View>
  </View>
  
  <Text style={styles.subTitle}>소품샵 추천</Text>

  {/* 추천 소품샵 */}
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
        marginTop: 10,
        alignItems: 'left',
        alignItems: 'left',
      },
      reviewSection: {
        marginTop: 20,
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
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
      },
      moreImages: {
        width: 60,
        height: 60,
        backgroundColor: colors.Gray100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },
      moreText: {
        fontSize: 16,
        color: colors.Gray500,
      },
      reviewBox: {
        marginBottom: 15,
      },
      reviewItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.Gray300,
        alignItems: 'center',
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
      reviewUser: {
        fontWeight: 'bold',
        fontSize: 14,
      },
      reviewDate: {
        fontSize: 12,
        color: colors.Gray500,
        marginVertical: 4,
      },
      reviewText: {
        fontSize: 14,
        color: colors.Gray900,
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
        borderWidth: 1,
        borderColor: colors.Gray300,
        borderRadius: 8,
        alignItems: 'center',
      },
      viewAllText: {
        fontSize: 14,
        color: colors.Gray700,
      },
      recommendSection: {
        marginTop: 20,
      },
      chipRow: {
        flexDirection: 'row',
        marginBottom: 15,
      },
      chip: {
        backgroundColor: colors.Gray100,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
      },
      chipText: {
        fontSize: 12,
        color: colors.Gray500,
      },
      shopRecommendationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      shopRecommendation: {
        width: 90,
        alignItems: 'center',
      },
      recommendImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginBottom: 5,
      },
    
 })

export default ShopDetailScreen;