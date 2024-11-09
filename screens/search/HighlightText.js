import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const HighlightText = ({ text, highlight }) => {
  // 'text' 또는 'highlight'가 유효한지 확인
  if (!text || !highlight) return <Text>{text}</Text>;

  // 정규식을 사용하여 highlight 값이 text에 포함된 부분을 찾습니다
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Text style={styles.text}>
      {parts.map((part, index) => 
        part.toLowerCase() === highlight.toLowerCase() 
          ? <Text key={index} style={styles.highlighted}>{part}</Text>
          : <Text key={index}>{part}</Text>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    padding:13,
    color: colors.Gray400, 
    fontWeight:'500'
  },
  highlighted: {
    color: colors.Gray900,
    fontWeight:'500'
  }
});

export default HighlightText;
