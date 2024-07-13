import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PreferPlaceScreen = ({ navigation }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    '홍대', '이태원', '신사', '승리단길', '영등포', '명동',
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
        <Text style={styles.text}>관심있는 장소를 선택해주세요</Text>
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
          onPress={() => navigation.navigate('Welcome')}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>다음</Text>
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
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
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
  },
  selectedTag: {
    backgroundColor: '#1FAA67',
  },
  unselectedTag: {
    backgroundColor: '#f0f0f0',
  },
  selectedTagText: {
    color: '#ffffff',
  },
  unselectedTagText: {
    color: '#000000',
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
    backgroundColor: '#1FAA67',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
  },
});

export default PreferPlaceScreen;
