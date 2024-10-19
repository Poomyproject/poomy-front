import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet , TextInput } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const UserReviewScreen3 = () => {
  const [reviewText, setReviewText] = useState(''); 
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();

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

      <TouchableOpacity
        style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isButtonDisabled}
        onPress={() => navigation.navigate('UserReview4')}
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
    ...fonts.Title2,
    color: colors.Green900,
    marginBottom: 10,
  },
  title: {
    ...fonts.Title2,
    color: colors.Green900,
    marginBottom: 10,
  },
  subTitle: {
    ...fonts.Body3,
    color: colors.Gray500,
    marginBottom: 20,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: colors.Gray200,
    borderRadius: 8,
    padding: 10,
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
    marginTop: 5,
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
    marginRight: 10,
  },
  photoText: {
    ...fonts.Body2,
    color: colors.Gray900,
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
