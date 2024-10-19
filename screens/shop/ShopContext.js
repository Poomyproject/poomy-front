import React, { createContext, useState } from 'react';

// ShopContext 생성
export const ShopContext = createContext();

// ShopProvider 정의
const ShopProvider = ({ children }) => {
  const [selectedShopId, setSelectedShopId] = useState(null);

  return (
    <ShopContext.Provider value={{ selectedShopId, setSelectedShopId }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
