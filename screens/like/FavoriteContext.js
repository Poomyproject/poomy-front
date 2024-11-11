import React, { createContext, useContext, useState } from 'react';
import ApiClient from '../auth/ApiClient';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFavorite = (shopId) => favorites.includes(shopId);

  const addFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/like`);
      if (response.data.success) {
        setFavorites((prev) => [...prev, shopId]);
      }
    } catch (error) {
      console.error('찜 추가 중 오류 발생:', error);
    }
  };

  const removeFavorite = async (shopId) => {
    try {
      const response = await ApiClient.post(`/api/favorite/${shopId}/unlike`);
      if (response.data.success) {
        setFavorites((prev) => prev.filter((id) => id !== shopId));
      }
    } catch (error) {
      console.error('찜 삭제 중 오류 발생:', error);
    }
  };

  const handleFavoriteToggle = (shopId) => {
    if (isFavorite(shopId)) {
      removeFavorite(shopId);
    } else {
      addFavorite(shopId);
    }
  };

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get('/api/favorite');
      if (response.data && response.data.success) {
        const favoriteIds = response.data.response.map((item) => item.shopId);
        setFavorites(favoriteIds);
      }
    } catch (error) {
      console.error('찜 리스트 불러오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, handleFavoriteToggle, fetchFavorites, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
