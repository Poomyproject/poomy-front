import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ApiClient from '../auth/ApiClient';
import Swiper from 'react-native-swiper';
import colors from '../../config/colors';
import {fonts} from '../../config/fonts';

const { width } = Dimensions.get('window');

const OneReviewScreen = ({ route }) => {
  const { reviewId } = route.params; // 전달된 reviewId 가져오기
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await ApiClient.get(`/api/reviews/${reviewId}`);
        if (response.data.success) {
          setReviewData(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.Green900} />
      </View>
    );
  }

  if (!reviewData) {
    return (
      <View style={styles.errorContainer}>
        <Text>리뷰를 불러오는데 문제가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.userContainer}>
          <Image source={require('../../assets/profile.png')} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{reviewData.userNickName}</Text>
            <Text style={styles.reviewDate}>{reviewData.date}</Text>
          </View>
          <Image
            source={reviewData.isRecommend ? require('../../assets/img_thumbs_up.png') : require('../../assets/img_thumbs_down.png')}
            style={styles.recommendIcon}
          />
        </View>
        <Text style={styles.reviewContent}>{reviewData.content}</Text>

        {reviewData.imgUrls && reviewData.imgUrls.length > 0 && (
          <Swiper
            style={styles.swiper}
            showsPagination
            dotColor="#D4D4D4"
            activeDotColor="#666666"
            paginationStyle={{ bottom: -5 }}
          >
            {reviewData.imgUrls.map((img, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: img.url }} style={styles.reviewImage} />
              </View>
            ))}
          </Swiper>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Ivory100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    backgroundColor: '#fff',
    marginBottom: 16,
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
    ...fonts.Body1,
    color : colors.Gray900,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    marginTop : 2,
  },
  recommendIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
  reviewContent: {
    ...fonts.Body4,
    color : colors.Gray900,
    marginVertical: 6,
    marginLeft : 4, 
  },
  swiper: {
    height: 330,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewImage: {
    width: 350,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default OneReviewScreen;
