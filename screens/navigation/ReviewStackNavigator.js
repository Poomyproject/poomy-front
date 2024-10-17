// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TouchableOpacity, Image, Text } from 'react-native';
// import colors from '../../config/colors';
// import UserReviewScreen1 from '../review/UserReviewScreen1';
// import UserReviewScreen2 from '../review/UserReviewScreen2';
// import UserReviewScreen3 from '../review/UserReviewScreen3';
// import UserReviewScreen4 from '../review/UserReviewScreen4';


// // createStackNavigator로 생성한 네비게이터를 Stack으로 사용
// const Stack = createStackNavigator();

// const ReviewStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="UserReview1" 
//         component={UserReviewScreen1} 
//         options={({ navigation }) => ({
//           headerTitle: '리뷰 작성 1단계',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
//             </TouchableOpacity>
//           ),
//           headerTitleAlign: 'center',
//           headerStyle: { backgroundColor: colors.Ivory100 }, // 헤더 배경 색
//           headerTintColor: colors.Green900, // 텍스트 색상
//         })}
//       />
//       <Stack.Screen 
//         name="UserReview2" 
//         component={UserReviewScreen2} 
//         options={({ navigation }) => ({
//           headerTitle: '리뷰 작성 2단계',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
//             </TouchableOpacity>
//           ),
//           headerTitleAlign: 'center',
//           headerStyle: { backgroundColor: colors.Ivory100 },
//           headerTintColor: colors.Green900,
//         })}
//       />
//       <Stack.Screen 
//         name="UserReview3" 
//         component={UserReviewScreen3} 
//         options={({ navigation }) => ({
//           headerTitle: '리뷰 작성 3단계',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
//             </TouchableOpacity>
//           ),
//           headerTitleAlign: 'center',
//           headerStyle: { backgroundColor: colors.Ivory100 },
//           headerTintColor: colors.Green900,
//         })}
//       />
//       <Stack.Screen 
//         name="UserReview4" 
//         component={UserReviewScreen4} 
//         options={({ navigation }) => ({
//           headerTitle: '리뷰 작성 4단계',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
//             </TouchableOpacity>
//           ),
//           headerTitleAlign: 'center',
//           headerStyle: { backgroundColor: colors.Ivory100 },
//           headerTintColor: colors.Green900,
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// export default ReviewStackNavigator;
