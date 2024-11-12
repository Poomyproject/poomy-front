import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Menu, Button, Provider } from 'react-native-paper';
import ApiClient from '../auth/ApiClient';
import { NewsLetterContext } from '../context/NewsLetterContext';

const NewsLetterScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [newsletters, setNewsletters] = useState([]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // API에서 데이터 가져오기
  const fetchData = async (option) => {
    try {
      let response;
      if (option === '최신순') {
        response = await ApiClient.get('/api/newsLetter/new'); // 최신순 API 호출
      } else if (option === '오래된순') {
        response = await ApiClient.get('/api/newsLetter/old'); // 오래된 순 API 호출
      } else if (option === '유용한순') {
        response = await ApiClient.get('/api/newsLetter/hot'); // 오래된 순 API 호출
      }
      if (response.data.success) {
        setNewsletters(response.data.response);
      }
      // console.log('API 응답:', response.data);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedOption); 
  }, []);

  const handleMenuSelect = (option) => {
    setSelectedOption(option);
    closeMenu();
    fetchData(option); 
  };

  // 상세 페이지 이름, 사진
  const numColumns = 2;
  const renderItem = ({ item }) => {  
    return (
      <TouchableOpacity
        style={styles.newsletterItem}
        onPress={() => handleNewsLetter(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.headline}
        </Text>
      </TouchableOpacity>
    );
  };

  const { setSelectedNewsLetterId } = useContext(NewsLetterContext);

  // 뉴스레터 상세페이지로 네비게이션 시 정보 넘기기
  const handleNewsLetter = (newsletterId) => {
    setSelectedNewsLetterId(newsletterId);
    navigation.navigate('NewsLetterStack', { screen: 'NewsLetterDetail', params: { newsletterId } });
};

  
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
            style={[styles.menuDropdown]}
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
          numColumns={numColumns}
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
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  menuButton: {
    alignSelf: 'flex-end',
  },
  newsletterItem: {
    flex: 1,
    margin: 8,
    borderRadius: 5,
    padding: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  image: {
    width: (Dimensions.get('window').width / 2) - 32,
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
    position: 'absolute',
    top: 55,
    width: 'auto',
    zIndex: 1,
  },
});

export default NewsLetterScreen;