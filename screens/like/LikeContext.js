import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiClient from '../auth/ApiClient'; // API 요청을 위한 클라이언트

// 1. Context 생성
const FavoriteContext = createContext();

// 2. Provider 컴포넌트 정의
export const FavoriteProvider = ({ children }) => {
  // 찜 상태를 관리할 상태 변수와 상태 변경 함수
  const [favorites, setFavorites] = useState([]); // 찜한 shopId 리스트

  // 찜 추가 함수
  const addFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/like`);
      if (response.data.success) {
        setFavorites((prev) => [...prev, shopId]); // 찜한 가게 추가
      } else {
        console.error('찜 추가 실패:', response.data);
      }
    } catch (error) {
      console.error('찜 추가 중 오류 발생:', error);
    }
  };

  // 찜 삭제 함수
  const removeFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/unlike`);
      if (response.data.success) {
        setFavorites((prev) => prev.filter((id) => id !== shopId)); // 찜한 가게 제거
      } else {
        console.error('찜 삭제 실패:', response.data);
      }
    } catch (error) {
      console.error('찜 삭제 중 오류 발생:', error);
    }
  };

  // 전체 찜한 리스트 초기 로드 (앱 실행 시 한 번만)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await ApiClient.get('/api/favorite'); // 전체 찜한 목록 가져오기
        if (response.data && response.data.success) {
          const favoriteIds = response.data.response.map((item) => item.shopId); // shopId 리스트 추출
          setFavorites(favoriteIds); // 초기 찜 리스트 설정
        }
      } catch (error) {
        console.error('찜 리스트 불러오기 오류:', error);
      }
    };

    fetchFavorites();
  }, []);

  // 3. Context 값으로 찜 상태와 관련된 함수들을 전달
  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// 4. 커스텀 훅: 다른 컴포넌트에서 쉽게 사용할 수 있도록 도와줌
export const useFavorites = () => useContext(FavoriteContext);
