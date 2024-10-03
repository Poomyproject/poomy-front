import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';

const sampleData = [
  {
    id: 1,
    title: '우리들의 Pick',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: '데이트하기 좋은 성수역 근처 소품샵',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: '주말 데이트 추천 서울',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: '성수역 근처 추천 소품샵',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    title: '소품샵 Road 추천',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    title: '우리들의 PICK 2',
    image: 'https://via.placeholder.com/150',
  },
];

const NewsLetterScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [newsletters, setNewsletters] = useState(sampleData);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleMenuSelect = (option) => {
    setSelectedOption(option);
    closeMenu();
    // 여기에서 추가적인 정렬 로직을 처리할 수 있습니다.
  };

  const numColumns = 2;
  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.newsletterItem}
      onPress={() => navigation.navigate('NewsLetterDetail', { screen: 'NewsLetterDetail', id: item.id })}
      >
        <Image source={{ uri: item.image }}
          style={styles.image}
        />
        <Text
          style={styles.title}
          numberOfLines={1}        // 최대 2줄로 제한
          ellipsizeMode='tail'     // 말줄임표를 텍스트 끝에 추가
        >{item.title}</Text>
      </TouchableOpacity>

  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu} style={styles.menuButton} labelStyle={{ color: 'grey' }}>
                {selectedOption} ▼
              </Button>
            }
            style={[styles.menuDropdown,]}
          >
            <Menu.Item onPress={() => handleMenuSelect('최신순')} title="최신순" titleStyle={{ fontSize: 14 }} />
            <Menu.Item onPress={() => handleMenuSelect('오래된순')} title="오래된순" titleStyle={{ fontSize: 14 }} />
            <Menu.Item onPress={() => handleMenuSelect('유용한순')} title="유용한순" titleStyle={{ fontSize: 14 }} />
          </Menu>
        </View>

        <FlatList
          data={newsletters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns} // 그리드로 배치하기 위한 설정
        />

      </View>


    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  menuContainer: {
    alignItems: 'flex-end',  // 메뉴가 오른쪽에 배치되도록 설정
    marginBottom: 10,
  },
  menuButton: {
    alignSelf: 'flex-end',  // 버튼을 오른쪽에 배치
  },
  newsletterItem: {
    flex: 1,
    margin: 8,
    borderRadius: 5,
    padding: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',

    // 그림자 효과 (iOS)
    // shadowColor: '#000',       // 그림자 색상
    // shadowOffset: { width: 0, height: 2 }, // 그림자의 오프셋 (x, y)
    // shadowOpacity: 0.2,        // 그림자의 불투명도
    // shadowRadius: 4,           // 그림자 반경
  },
  image: {
    width: (Dimensions.get('window').width / 2) - 32, // 각 아이템의 너비 설정
    height: 120,
    borderRadius: 0,
  },
  title: {
    fontSize: 13,
    padding: 5,
    textAlign: 'center',
    padding: 10,
  },
  menuDropdown: {
    position: 'absolute',  // 절대 위치 설정
    top: 55,               // 버튼 아래로 드롭다운 이동 (버튼 높이에 따라 조정 필요)
    width: 'auto',         // 드롭다운 폭 조정
    zIndex: 1,             // 드롭다운을 다른 요소 위로 표시하기 위한 설정
  },
});

export default NewsLetterScreen;
