import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import ApiClient from '../auth/ApiClient';

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false); // 중복 요청 방지용

  // 특정 shopId가 찜 목록에 있는지 확인하는 함수
  const isFavorite = (shopId) => favorites.has(shopId);

  // 찜 추가 함수
  const addFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/like`);
      if (response.data.success) {
        setFavorites((prev) => new Set(prev).add(shopId));
      }
    } catch (error) {
      //console.error('찜 추가 중 오류 발생:', error);
    }
  };

  // 찜 삭제 함수
  const removeFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/unlike`);
      if (response.data.success) {
        setFavorites((prev) => {
          const updated = new Set(prev);
          updated.delete(shopId);
          return updated;
        });
      }
    } catch (error) {
      console.error('찜 삭제 중 오류 발생:', error);
    }
  };

  // 찜 상태 토글 함수
  const handleFavoriteToggle = (shopId) => {
    if (isFavorite(shopId)) {
      removeFavorite(shopId);
    } else {
      addFavorite(shopId);
    }
  };

  // 전체 찜 목록을 API에서 가져오는 함수
  const fetchFavorites = async () => {
    if (isFetching.current) return; // 중복 요청 방지
    setLoading(true);
    isFetching.current = true;
    try {
      const response = await ApiClient.get('/api/favorite');
      if (response.data && response.data.success) {
        const favoriteIds = response.data.response.map((item) => item.shopId);
        setFavorites(new Set(favoriteIds));
      }
    } catch (error) {
      //console.error('찜 리스트 불러오기 오류:', error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // 컴포넌트가 마운트될 때 찜 목록 가져오기
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        handleFavoriteToggle,
        fetchFavorites,
        loading
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
