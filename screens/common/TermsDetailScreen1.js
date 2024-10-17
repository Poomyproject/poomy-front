import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../config/colors';  // 필요한 색상 값 추가

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>필수 이용 약관</Text>
      <Text style={styles.subtitle}>개인정보 처리방침 (푸미)</Text>
      
      <View style={styles.section}>
        <View style={styles.box}>
          <Text style={styles.text}>
            <Text style={styles.companyName}>푸미(이하 '회사')</Text>는(은) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
          </Text>
          <Text style={styles.text}>
            회사는 개인정보처리방침을 개정하는 경우 7일 전부터 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
          </Text>
          <Text style={styles.text}>
            본 방침은 2024년 11월 2일부터 시행됩니다.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>제1조(개인정보의 처리목적)</Text>
        <Text style={styles.text}>
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',  // 배경 색상
    padding: 16,  // 좌우 패딩 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',  // 제목 색상
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',  // 부제목 색상
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,  // 섹션 간격
  },
  box: {
    backgroundColor: '#F4F4F4',  // 박스 배경 색상
    padding: 16,
    borderRadius: 8,  // 모서리 둥글게
  },
  companyName: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',  // 텍스트 색상
    lineHeight: 22,  // 줄 간격
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',  // 섹션 제목 색상
    marginBottom: 10,
  },
});

export default TermsScreen;