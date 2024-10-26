import React, { createContext, useState } from 'react';

export const NewsLetterContext = createContext();

const NewsLetterProvider = ({ children }) => {
  const [selectedNewsLetterId, setSelectedNewsLetterId] = useState(null);

  return (
    <NewsLetterContext.Provider value={{ selectedNewsLetterId, setSelectedNewsLetterId }}>
      {children}
    </NewsLetterContext.Provider>
  );
};

export default NewsLetterProvider;
