import React from 'react';
import { View, Text, Button } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>OnboardingScreen</Text>

      <Button
        title="Go to LoginScreen"
        onPress={() => navigation.navigate('Login')}
      />
      
    </View>
  );
};

export default OnboardingScreen;
