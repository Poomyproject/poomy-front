import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <SearchContext.Provider value={{ selectedWord, setSelectedWord }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
