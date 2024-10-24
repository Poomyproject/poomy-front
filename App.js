import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './screens/navigation/AppNavigator';
import Initializer from './Initializer';
import { Toast, toastConfig } from './screens/search/Toast';

export default function App() {
  return (
    <NavigationContainer>
      <Initializer />
      <AppNavigator />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}