import React from 'react';
import { View, Text, Button } from 'react-native';

const NamesetScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>nameset</Text>
      <Button
        title="Go to Next Page"
        onPress={() => navigation.navigate('PreferSelect')} 
      />
    </View>
  );
};

export default NamesetScreen;
