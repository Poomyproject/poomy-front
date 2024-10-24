import React, { createContext, useState } from 'react';

// ShopContext 생성
export const KeywordContext = createContext();

// ShopProvider 정의
const SpotProvider = ({ children }) => {
  const [selectedSpotName, setSelectedSpotName] = useState(null);

  return (
    <KeywordContext.Provider value={{ selectedSpotName, setSelectedSpotName }}>
      {children}
    </KeywordContext.Provider>
  );
};

export default SpotProvider;
