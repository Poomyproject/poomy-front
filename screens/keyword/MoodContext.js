import React, { createContext, useState } from 'react';

export const MoodContext = createContext();

const MoodProvider = ({ children }) => {
  const [selectedMoodId, setSelectedMoodId] = useState(null);

  return (
    <MoodContext.Provider value={{ selectedMoodId, setSelectedMoodId }}>
      {children}
    </MoodContext.Provider>
  );
};

export default MoodProvider;
