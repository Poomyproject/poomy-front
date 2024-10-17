import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Image, ScrollView } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const AnnounceScreen = () => {
  const [isExpanded1, setIsExpanded1] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style = {[styles.title, { marginTop: 20 }]}>앱 버전 업데이트 2023.11.20</Text>
      <TouchableOpacity onPress={() => setIsExpanded1(!isExpanded1)} style={styles.toggleButton}>
        <Text style={[styles.question, isExpanded1 && styles.activeQuestion]}>새로운 버전 출시</Text>
        <Image source = {isExpanded1 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded1 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.Ivory100,
    flex: 1,
  },

  title:{
    ...fonts.Body4,
    marginLeft : 20,
    marginTop : 10, 
    color : colors.Gray300,
  },

  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding : 20 , 
    backgroundColor: colors.Ivory100,
  },

  question: {
    ...fonts.Body3,
    color : colors.Gray900,
    backgroundColor:colors.Ivory100,
  },

  activeQuestion: {
    color: colors.Green900,
  },

  answerContainer: {
    padding: 20,
    marginTop :-20 , 
    backgroundColor: colors.Ivory300,

  },
  answerText: {
    ...fonts.Caption1,
    color : colors.Gray700,

  },
  icon: {
    width: 20,
    height: 20,
  },
  separator: {
    marginTop: -10 , 
    height: 1, // 선의 두께
    backgroundColor: colors.Gray100, // 선의 색상
    marginHorizontal: 20, // 좌우 간격
    marginVertical: 20, // 위아래 간격
  },
});


export default AnnounceScreen;
