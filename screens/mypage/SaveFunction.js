// // // saveFunctions.js
// import ApiClient from '../auth/ApiClient';
// import { Alert } from 'react-native';

// export const handleSave = async (moods, places, navigation) => {
//   try {
//     await ApiClient.put('/api/users/moods', { moods });
//     await ApiClient.put('/api/users/spots', { spots: places });
//     Alert.alert('저장 완료', '변경사항이 성공적으로 저장되었습니다.');
//     navigation.goBack();
//   } catch (error) {
//     console.error('저장 실패:', error);
//     Alert.alert('저장 실패', '변경사항 저장에 실패했습니다. 다시 시도해주세요.');
//   }
// };
