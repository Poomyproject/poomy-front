import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import colors from '../config/colors';

const OnboardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const handleIndexChanged = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        loop={false}
        index={index}
        onIndexChanged={handleIndexChanged}
      >
        <View style={styles.slide}>
          <Text style={[styles.text, styles.textPosition]}>
            반가워요!{'\n'}소품샵 찾아주는 앱{'\n'}
            <Text style={styles.highlight}>Pommy</Text>예요.
          </Text>
          <Image source={require('../assets/onboarding1.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={[styles.text, styles.textPosition]}>
            <Text style={styles.highlight}>Pommy</Text>는{'\n'}여러분의 취향에 맞는 소품{'\n'}소품샵을 추천해줘요.
          </Text>
          <Image source={require('../assets/onboarding2.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={[styles.text, styles.textPosition]}>
            생생한 소품샵 후기,{'\n'}
            <Text style={styles.highlight}>Pommy</Text>에서 찾아보세요.
          </Text>
          <Image source={require('../assets/onboarding3.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={[styles.text, styles.textPosition]}>
            <Text style={styles.highlight}>Pommy</Text>와{'\n'} 내 마음에 쏙 드는 {'\n'} 소품샵을 찾으러 떠나볼까요?
          </Text>
          <Image source={require('../assets/onboarding4.png')} style={styles.image} />
        </View>
      </Swiper>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor:colors.Ivory100,
  },
  swiper: {
  flex: 1,
  },
  slide: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.Ivory100,
  },
  text: {
  color: colors.Black,
  fontSize: 24,
  fontWeight: 'bold',
  position: 'absolute', // Absolute positioning
  textAlign: 'left',
  marginTop: 42,
  marginHorizontal: 20,
  },
  highlight: {
  color: colors.Green900,
  },
  textPosition: {
  top: 102,
  left: 20,
  },
  image: {
  width: 390,
  height: 380,
  position: 'absolute',
  marginTop: 42,
  },
  buttonContainer: {
  padding: 20,
  backgroundColor: colors.Ivory100,
  },
  
  button: {
  width: 350,
  height: 48,
  backgroundColor: colors.Green900,
  position: 'absolute',
  bottom: 94,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8, // 둥근 모서리
  },
  
  buttonText: {
  color: colors.Ivory100,
  fontSize: 15,
  
  },
  
  dot: {
  backgroundColor: colors.Gray200,
  width: 8,
  height: 8,
  borderRadius: 4,
  marginBottom: 180,
  marginHorizontal: 3,
  },
  activeDot: {
  backgroundColor: colors.Gray700,
  width: 8,
  height: 8,
  borderRadius: 4,
  marginBottom: 180,
  marginHorizontal: 3,
  }
  });
  
export default OnboardingScreen;