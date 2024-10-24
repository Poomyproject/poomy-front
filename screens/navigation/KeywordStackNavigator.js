import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import KeywordRecmdScreen from '../keyword/KeywordRecmdScreen';

const KeywordStack = createStackNavigator();

const KeywordStackNavigator = () => {
  return (
    <KeywordStack.Navigator>
      <KeywordStack.Screen
        name="키워드 추천"
        component={KeywordRecmdScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </KeywordStack.Navigator>
  );
};

export default KeywordStackNavigator;
