import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button
        title="Go to Terms"
        onPress={() => navigation.navigate('Terms')}
      />
      
    </View>
  );
};

export default LoginScreen;
