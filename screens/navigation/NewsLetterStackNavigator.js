import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import NewsLetterScreen from '../NewsLetterScreen';
import NewsLetterDetailScreen from '../NewsLetterDetailScreen';

const NewsLetterStack = createStackNavigator();

const NewsLetterStackNavigator = () => {
  return (
    <NewsLetterStack.Navigator>
      <NewsLetterStack.Screen
        name="NewsLetter"
        component={NewsLetterScreen}
        options={({ navigation }) => ({
          headerTitle: '뉴스레터',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <NewsLetterStack.Screen
        name="NewsLetterDetail"
        component={NewsLetterDetailScreen}
        options={({ navigation }) => ({
          headerTitle: '뉴스레터',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/left.png')} style={{ height: 24, width: 24, marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </NewsLetterStack.Navigator>
  );
};

export default NewsLetterStackNavigator;
