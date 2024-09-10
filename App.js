// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { Image, StyleSheet ,TouchableOpacity,Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import TermsScreen from './screens/TermsScreen';
import NamesetScreen from './screens/NamesetScreen';
import PreferSelectScreen from './screens/PreferSelectScreen';
import PerferPlaceScreen from './screens/PreferPlaceScreen';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyPageScreen from './screens/MyPageScreen';
import SearchScreen from './screens/SearchScreen';
import MypageEditScreen from './screens/MypageEditScreen';
import SettingScreen from './screens/SettingScreen';
import AnnounceScreen from './screens/AnnounceScreen';
import { Toast, toastConfig } from './screens/Toast'; 
import InquiryScreen from './screens/InquiryScreen';
import TermsDetailScreen1 from './screens/TermsDetailScreen1';
import TermsDetailScreen2 from './screens/TermsDetailScreen2';
import TermsDetailScreen3 from './screens/TermsDetailScreen3';
import WelcomeScreen from './screens/WelcomeScreen';
import colors from './config/colors';
import { fonts } from './config/fonts';
import KeywardRecmdScreen from './screens/KeywardRecmdScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
import ApiClient from './screens/ApiClient';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();
const KeywardStack = createStackNavigator();
const MypageStack = createStackNavigator();


const MypageStackScreen = () => {
  return (
    <MypageStack.Navigator>
      <MypageStack.Screen 
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <MypageStack.Screen 
        name="MypageEdit"
        component={MypageEditScreen}
        options={({ navigation }) => ({
          headerTitle: '마이페이지 수정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style={{ height:24, width: 24 }}/>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style ={{marginRight:20, color : colors.Green900 , ...fonts.Body2}}>완료</Text>
            </TouchableOpacity>
          ),
        })}
        
      />
    </MypageStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          headerShown: false,
          tabBarLabel: '찜',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_todo.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }} 
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      {/* 여기서 이름을 "MyPageTab"으로 변경 */}
      <Tab.Screen 
        name="MyPageTab" 
        component={MypageStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/ic_mypage.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};


// SearchStackNavigator 설정
const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </SearchStack.Navigator>
  );
};

// KeywardStackNavigator 설정
const KeywardStackNavigator = () => {
  return (
    <KeywardStack.Navigator>
      <KeywardStack.Screen name="Keward" 
      component={KeywardRecmdScreen}
      options={{ 
        title: '키워드 추천', // 헤더 이름 지정
        headerShown: true, // 헤더를 표시하도록 설정
        }} />
    </KeywardStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTab"> 
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Nameset" component={NamesetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreferSelect" component={PreferSelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreferPlace" component={PerferPlaceScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="SearchStack" component={SearchStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="KeywardStack" component={KeywardStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MypageEdit" component={MypageEditScreen} options={{ headerShown:true}}/>
        <Stack.Screen name="Setting" component={SettingScreen} options={({ navigation }) => ({
          headerTitle: '환경설정',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          ),
          })}/>
        <Stack.Screen name="Inquiry" component={InquiryScreen} options={({ navigation }) => ({
          headerTitle: '문의사항',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}/>
        <Stack.Screen
        name="Announce"
        component={AnnounceScreen}
        options={({ navigation }) => ({
          headerTitle: '공지사항',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}
        />
        <Stack.Screen name= "TermsDetail1" component={TermsDetailScreen1} options={({ navigation }) => ({
          headerTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}/>
        <Stack.Screen name= "TermsDetail2" component={TermsDetailScreen2} options={({ navigation }) => ({
          headerTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}/>
          <Stack.Screen name= "TermsDetail3" component={TermsDetailScreen3} options={({ navigation }) => ({
          headerTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}/>
          <Stack.Screen name= "ShopDetail" component={ShopDetailScreen} options={({ navigation }) => ({
          headerTitle: ' ',
          headerLeft: () => (
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
              <Image source={require('./assets/left.png')} style = {{height:24, width : 24}}/>
            </TouchableOpacity>
           ),
          })}/>
      </Stack.Navigator>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft : 10 ,
  },

});