import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, Text } from 'react-native';
import MyPageScreen from '../MyPageScreen';
import MypageEditScreen from '../MypageEditScreen';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const MypageStack = createStackNavigator();

const MypageStackNavigator = () => {
  return (
    <MypageStack.Navigator>
      <MypageStack.Screen name="MyPage" component={MyPageScreen} options={{ headerShown: false }} />
      <MypageStack.Screen
        name="MypageEdit"
        component={MypageEditScreen}
        options={({ navigation }) => ({
          headerTitle: '마이페이지 수정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ marginRight: 20, color: colors.Green900, ...fonts.Body2 }}>완료</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </MypageStack.Navigator>
  );
};

export default MypageStackNavigator;