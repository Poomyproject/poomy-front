import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const HighlightedText = ({ text, highlight }) => {
  // highlight가 없을 때는 그냥 기본 텍스트를 반환
  if (!highlight) return <Text style={styles.storeName}>{text}</Text>;

  // highlight와 일치하는 부분을 기준으로 텍스트를 나눔
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <Text style={styles.storeName}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={part.toLowerCase() === highlight.toLowerCase() ? styles.highlight : null}
        >
          {part}
        </Text>
      ))}
    </Text>
  );
};

export default HighlightedText;
