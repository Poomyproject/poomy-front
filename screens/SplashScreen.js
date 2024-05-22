import React from 'react';
import { View, Text, Button } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SplashScreen</Text>

      <Button
        title="Go to Onboarding Screen"
        onPress={() => navigation.navigate('Onboarding')}
      />
      
    </View>
  );
};

export default SplashScreen;
