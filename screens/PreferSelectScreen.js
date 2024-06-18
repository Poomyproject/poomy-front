import React from 'react';
import { View, Text, Button } from 'react-native';

const PreferSelectScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>prefer</Text>
      <Button
        title="Go to Next Page"
        onPress={() => navigation.navigate('PreferPlace')} 
      />

    </View>
  );
};

export default PreferSelectScreen;
