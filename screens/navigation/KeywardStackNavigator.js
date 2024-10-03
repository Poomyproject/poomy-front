import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import KeywardRecmdScreen from '../KeywardRecmdScreen';

const KeywardStack = createStackNavigator();

const KeywardStackNavigator = () => {
  return (
    <KeywardStack.Navigator>
      <KeywardStack.Screen
        name="키워드 추천"
        component={KeywardRecmdScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24,marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </KeywardStack.Navigator>
  );
};

export default KeywardStackNavigator;
