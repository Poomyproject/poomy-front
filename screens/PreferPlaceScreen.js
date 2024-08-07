import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import { fonts } from '../config/fonts'; 


const PreferPlaceScreen = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    '홍대', '이태원', '신사', '송리단길', '영등포', '명동',
    '종로', '북촌 한옥마을', '혜화', '강남', '신촌', '성수',
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else if (selectedTags.length < 2) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const isButtonDisabled = selectedTags.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={require('../assets/progress_bar2.png')} style={styles.image} />
        <Text style={styles.text}>관심있는 장소를 선택해주세요.</Text>
        <Text style={styles.details}>당신의 주요 활동지가 어디인가요? (최대 2개)</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) ? styles.selectedTag : styles.unselectedTag,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) ? styles.selectedTagText : styles.unselectedTagText,
                ]}
              >
                #{tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={() => navigation.navigate('MainTab', { screen: 'Main' })}
          disabled={isButtonDisabled}
        >
          <Text style={[styles.buttonText, isButtonDisabled ? styles.buttonTextInactive : styles.buttonTextActive]}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60, 
    backgroundColor: colors.Ivory100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: -10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    width: 48,
    height: 8,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    ...fonts.Heading1,
    textAlign: 'left',
    marginBottom: 10,
  },

  details: {
    ...fonts.Body2,
    color: colors.Gray700,
    marginBottom: 20,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  tag: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1, // 태그의 테두리 두께 설정
  },

  selectedTag: {
    backgroundColor: colors.Green900,
    borderColor: colors.Green900, // 선택된 상태의 태그 테두리 색상
  },
  unselectedTag: {
    backgroundColor: colors.Ivory100,
    borderColor: colors.Gray100, // 비선택 상태의 태그 테두리 색상
  },
  selectedTagText: {
    color: colors.Ivory100,
    ...fonts.Body2,
  },
  unselectedTagText: {
    color: colors.Gray700,
    ...fonts.Body2,
  },
  button: {
    width: 350,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // 둥근 모서리
    position: 'absolute',
    bottom: 94,
    alignSelf: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.Green900,
  },
  buttonDisabled: {
    backgroundColor: colors.Gray100,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium'
  },
  buttonTextActive: {
    color: colors.Ivory100, // 활성화 상태의 버튼 텍스트 색상
  },
  buttonTextInactive: {
    color: colors.Gray500, // 비활성화 상태의 버튼 텍스트 색상
  },
});

export default PreferPlaceScreen;