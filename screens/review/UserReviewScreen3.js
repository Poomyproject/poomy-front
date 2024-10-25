import React, { useState, useEffect , useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import ApiClient from '../auth/ApiClient'; // API 클라이언트 import
import { useRoute } from '@react-navigation/native';


const UserReviewScreen3 = () => {
  const [reviewText, setReviewText] = useState(''); 
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedShopId } = route.params;
  //console.log('상점아이디',selectedShopId)



  // 버튼 활성화 여부 확인 (리뷰 텍스트가 20자 이상인 경우)
  const isButtonDisabled = reviewText.length < 20;

  // 다중 이미지 선택 핸들러
  const pickMultipleImages = () => {
    ImagePicker.openPicker({
      multiple: true, // 다중 이미지 선택 옵션
      mediaType: 'photo',
      maxFiles: 3, // 최대 3개의 이미지를 선택할 수 있도록 설정
    }).then(images => {
      setPhotos(images);
    }).catch(error => {
      console.log(error);
    });
  };

  const submitReview = async () => {
    try {
      // AsyncStorage에서 isRecommend, moods 정보 가져오기
      const isRecommend = JSON.parse(await AsyncStorage.getItem('isRecommend'));
      const selectedMoods = JSON.parse(await AsyncStorage.getItem('moods'));
  
      if (!selectedMoods || selectedMoods.length === 0) {
        Alert.alert('오류', '무드를 선택하세요.');
        return;
      }
  
      if (!selectedShopId) {
        Alert.alert('오류', '선택된 상점 ID가 없습니다.');
        return;
      }
  
      // FormData 객체 생성
      const formData = new FormData();
      formData.append('poomShopId', selectedShopId); // 상점 ID 추가
      formData.append('isRecommend', isRecommend); // 추천 여부 추가
      formData.append('content', reviewText); // 리뷰 내용 추가
  
      // 선택한 무드 ID 추가 (무드의 ID를 전송)
      selectedMoods.forEach((moodId) => {
        formData.append('moodIds', moodId); // 무드의 ID를 전송해야 함
      });
  
      // 이미지 파일 추가
      photos.forEach((photo, index) => {
        formData.append('multipartFiles', {
          uri: photo.path,
          type: photo.mime,
          name: `review_image_${index}.jpg`,
        });
      });
  
      // API 호출
      const response = await ApiClient.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        Alert.alert('성공', '리뷰가 성공적으로 저장되었습니다.');
        navigation.navigate('UserReview4', {
          reviewId: response.data.response.id,
          userNickName: response.data.response.userNickName,
          userImgUrl: response.data.response.userImgUrl,
          date: response.data.response.date,
          content: response.data.response.content,
          isRecommend: response.data.response.isRecommend,
          imgUrls: response.data.response.imgUrls,
        });
      } else {
        console.error('리뷰 전송 실패:', response.data);
        Alert.alert('오류', '리뷰 저장 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('리뷰 전송 중 오류 발생:', error);
      Alert.alert('오류', '리뷰 저장 중 오류가 발생했습니다.');
    }
  };
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상세한 후기를 남겨 주세요!</Text>
      <Text style={styles.subTitle}>건전하고 예의 바른 언어를 사용해 주세요.</Text>

      {/* 리뷰 텍스트 입력란 */}
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="후기를 자유롭게 작성해 보세요."
          placeholderTextColor={colors.Gray300}
          multiline
          value={reviewText}
          onChangeText={setReviewText}
          maxLength={500}
        />
        <Text style={styles.charCount}>{`${reviewText.length}/500`}</Text>
        <Text style={styles.minChars}>최소 20자 이상</Text>
      </View>

      {/* 이미지 선택 */}
      <FlatList
        horizontal
        data={[...photos, { isPlaceholder: true }]} // 마지막 항목에 사진 첨부 버튼을 포함
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item.isPlaceholder ? (
          <TouchableOpacity style={styles.photoButton} onPress={pickMultipleImages}>
            <Image source={require('../../assets/img_image.png')} style={styles.photoIcon} />
            <Text style={styles.photoText}>사진 첨부</Text>
          </TouchableOpacity> 
        ) : (
          <Image source={{ uri: item.path }} style={styles.selectedImage} />
        )}
        style={{ marginBottom: 20 }}
      />

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isButtonDisabled}
        onPress={submitReview} // 리뷰 데이터 전송 함수 호출
      >
        <Text style={[styles.buttonText, isButtonDisabled ? styles.buttonTextInactive : styles.buttonTextActive]}>
          다음으로
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Ivory100,
  },
  title: {
    marginTop : 40 , 
    ...fonts.Title2,
    color: colors.Black,
    marginBottom: 10,
  },
  subTitle: {
    ...fonts.Body2,
    color: colors.Gray700,
    marginBottom: 20,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: colors.Gray200,
    borderRadius: 8,
    padding: 10,
    marginTop : 20,
    marginBottom: 20,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    color: colors.Gray900,
    ...fonts.Body2,
  },
  charCount: {
    textAlign: 'right',
    color: colors.Gray300,
    marginTop: 5,
  },
  minChars: {
    color: colors.Gray300,
    marginTop: - 15,
  },
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  photoButton: {
    width: 70,
    height: 70, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.Gray200,
    borderRadius: 8,
    marginRight: 10,
  },
  photoIcon: {
    width: 24,
    height: 24,
  },
  photoText: {
    ...fonts.Caption1,
    color: colors.Gray900,
    marginTop : 3,
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom : 54 ,
  },
  buttonEnabled: {
    backgroundColor: colors.Green900,
  },
  buttonDisabled: {
    backgroundColor: colors.Gray100,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
  },
  buttonTextActive: {
    color: colors.Ivory100,
  },
  buttonTextInactive: {
    color: colors.Gray500,
  },
});

export default UserReviewScreen3;
