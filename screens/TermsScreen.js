import React from 'react';
import { View, Text, Button } from 'react-native';

const TermsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>terms</Text>
      <Button
        title="Go to name"
        onPress={() => navigation.navigate('Nameset')}
      />
      
    </View>
  );
};

export default TermsScreen;
