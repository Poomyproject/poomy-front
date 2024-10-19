import React, { createContext, useState, useEffect } from 'react';
import ApiClient from '../auth/ApiClient';

// Create a context for user data
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');
  const [googleEmail, setgoogleEmail] = useState('');
  const [imgUrl, setImgUrl] = useState(''); // 이미지 URL 관리 추가
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // API에서 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await ApiClient.get('/api/users');
      if (response.data.success) {
        const userData = response.data.response;
        console.log('User data:', userData);
        setNickname(userData.nickname);
        setgoogleEmail(userData.googleEmail);
        setImgUrl(userData.imgUrl); // 이미지 URL 설정
        setSelectedMoods(userData.moods.map(mood => mood.name));
        setSelectedPlaces(userData.spots.map(spot => spot.name));
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 사용자 데이터를 가져옵니다.
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        nickname,
        googleEmail,
        imgUrl,
        selectedMoods,
        selectedPlaces,
        setNickname,
        setgoogleEmail,
        setImgUrl,
        setSelectedMoods,
        setSelectedPlaces,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
