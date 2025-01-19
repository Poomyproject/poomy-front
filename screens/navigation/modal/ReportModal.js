import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Mailer from 'react-native-mail';
import { fonts } from '../../../config/fonts';
import colors from '../../../config/colors';
import { Alert } from 'react-native';

const ReportModal = ({ visible, onClose, reviewId }) => {
    const [selectedReason, setSelectedReason] = useState(null);
  
    const reportReasons = [
      '잘못된 정보',
      '욕설',
      '상업적 광고',
      '음란물',
      '폭력성',
      '기타',
    ];
  
    const handleSendMail = (reason) => {
      Mailer.mail(
        {
          subject: '신고 접수',
          recipients: ['poomydeveloper@gmail.com'],
          body: `
            <p>리뷰 ID: <b>${reviewId}</b></p>
            <p>신고 사유: <b>${reason}</b></p>
          `,
          isHTML: true,
        },
        (error, event) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent successfully');
          }
    
          onClose(); // 모달 닫기
    
          // 신고 접수 알림창 표시
          Alert.alert(
            '신고가 접수되었습니다.',
            '검토는 최대 24시간이 걸립니다.',
            [{ text: '확인' }]
          );
        }
      );
    };
    
  
    const handleSelectReason = (reason) => {
      setSelectedReason(reason);
      handleSendMail(reason); // 선택된 이유와 함께 이메일 전송
      onClose(); // 모달 닫기
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>신고 사유를 선택해주세요</Text>
            <Text style={styles.modalDetail}>
              신고 사유에 맞지 않는 신고일 경우, 해당 신고는 처리되지 않습니다.{'\n'}
              누적 신고횟수가 3회 이상인 유저는 리뷰 작성을 할 수 없게 됩니다.
            </Text>
            {reportReasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reasonButton}
                onPress={() => handleSelectReason(reason)}
              >
                <Text style={styles.reasonText}>{reason}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    ...fonts.Body1,
    fontWeight: '600',
    color: colors.Gray900,
    marginBottom: 10,
  },
  modalDetail:{
    ...fonts.Body4,
    fontWeight: '300',
    color: colors.Gray400,
    textAlign: 'center', // 텍스트 중앙 정렬
    alignSelf: 'center', // 부모 뷰 기준으로 중앙 정렬
    marginBottom: 20,
  },
  reasonButton: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.Gray50,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  reasonText: {
    fontSize: 16,
    color: colors.Gray900,
  },
  closeButton: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.Green900,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReportModal;
