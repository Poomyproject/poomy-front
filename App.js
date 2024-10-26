import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './screens/navigation/AppNavigator';
import Initializer from './Initializer';
import { Toast, toastConfig } from './screens/search/Toast';
import { FavoriteProvider } from './screens/like/LikeContext'; 
import ShopProvider from './screens/shop/ShopContext';
import SpotProvider from './screens/keyword/KeywordContext';
import MoodProvider from './screens/keyword/MoodContext'


export default function App() {
  return (
    <MoodProvider>
    <SpotProvider>
    <ShopProvider>
    <FavoriteProvider>
    <NavigationContainer>
      <Initializer />
      <AppNavigator />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    </FavoriteProvider>
    </ShopProvider>
    </SpotProvider>
    </MoodProvider>
  );
}