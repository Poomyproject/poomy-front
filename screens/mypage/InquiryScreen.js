import React,{useState} from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity , ScrollView} from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const InquiryScreen = () => {
  
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [isExpanded4, setIsExpanded4] = useState(false);
  const [isExpanded5, setIsExpanded5] = useState(false);
  const [isExpanded6, setIsExpanded6] = useState(false);
  const [isExpanded7, setIsExpanded7] = useState(false);
  const [isExpanded8, setIsExpanded8] = useState(false);


  return (
    <ScrollView style={styles.container}>
      <Text style = {[styles.title, { marginTop: 20 }]}>회원가입 및 로그인</Text>
      <TouchableOpacity onPress={() => setIsExpanded1(!isExpanded1)} style={styles.toggleButton}>
        <Text style={[styles.question, isExpanded1 && styles.activeQuestion]}>소셜 로그인 계정을 변경할 수 있나요?</Text>
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

     
      <Text style = {[styles.title, { marginTop: 35 }]}>리뷰 작성 및 관리</Text>
      <TouchableOpacity onPress={() => setIsExpanded2(!isExpanded2)} style={styles.toggleButton}>
      <Text style={[styles.question, isExpanded2 && styles.activeQuestion]}>리뷰를 어떻게 남길 수 있나요?</Text>
        <Image source = {isExpanded2 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />
      

      {isExpanded2 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
      )}


      <TouchableOpacity onPress={() => setIsExpanded3(!isExpanded3)} style={[styles.toggleButton,{marginTop : -15 }]}>
      <Text style={[styles.question, isExpanded3 && styles.activeQuestion]}>리뷰를 수정하거나 삭제할 수 있나요?</Text>
        <Image source = {isExpanded3 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded3 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
        )}
      <TouchableOpacity onPress={() => setIsExpanded4(!isExpanded4)} style={[styles.toggleButton,{marginTop : -15 }]}>
      <Text style={[styles.question, isExpanded4 && styles.activeQuestion]}>소셜 로그인 계정을 변경할 수 있나요?</Text>
        <Image source = {isExpanded4 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />
      

      {isExpanded4 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
      )}

<Text style = {[styles.title, { marginTop: 35 }]}>앱 기능 및 사용법</Text>
      <TouchableOpacity onPress={() => setIsExpanded5(!isExpanded5)} style={styles.toggleButton}>
      <Text style={[styles.question, isExpanded5 && styles.activeQuestion]}>앱 사용중 문제가 발생하면 어떻게 해결할 수 있나요?</Text>
        <Image source = {isExpanded5 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded5 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
      )}
     
      <Text style = {[styles.title, { marginTop: 35 }]}>개인정보 및 보안</Text>
      <TouchableOpacity onPress={() => setIsExpanded6(!isExpanded6)} style={styles.toggleButton}>
      <Text style={[styles.question, isExpanded6 && styles.activeQuestion]}>개인정보는 어떻게 보호되나요?</Text>
        <Image source = {isExpanded6 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded6 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => setIsExpanded7(!isExpanded7)} style={[styles.toggleButton,{marginTop : -15 }]}>
      <Text style={[styles.question, isExpanded7 && styles.activeQuestion]}>앱 내에서 개인정보를 수정할 수 있나요?</Text>
        <Image source = {isExpanded7 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded7 && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
            변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다. 변경 불가합니다.
          </Text>
        </View>
        )}

      <TouchableOpacity onPress={() => setIsExpanded8(!isExpanded8)} style={[styles.toggleButton,{marginTop : -15 }]}>
        <Text style={[styles.question, isExpanded8 && styles.activeQuestion]}>다른 사용자의 리뷰에 댓글을 달 수 있나요?</Text>
        <Image source = {isExpanded8 ? require('../../assets/img_toggle_down.png') : require('../../assets/img_toggle.png')} style={styles.icon}></Image>
      </TouchableOpacity>
      <View style={styles.separator} />

      {isExpanded8 && (
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

export default InquiryScreen;
