import React from 'react';
import { TouchableOpacity, Text, ScrollView, ImageBackground, Image, View } from 'react-native';
import styles from './styles';

const ShopRecommendation = ({ moodItem, onShopPress, onMoodPress }) => {
  return (
    <View style={{flex:1}}>
      {/* 소품샵 추천 */}
      <TouchableOpacity style={styles.rightIconContainer} onPress={() => onMoodPress(moodItem?.hashtag)}>
        <View style={styles.sectionTitle_sec_view}>
          <Text style={styles.sectionTitle_sec}>{moodItem?.prefix} </Text>
          <Text style={styles.sectionTitle_sec_color}>#{moodItem?.hashtag} </Text>
          <Text style={styles.sectionTitle_sec}>소품샵 </Text>
        </View>
        <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
      </TouchableOpacity>

      {/* 소품샵 추천 사진 */}
      <ScrollView horizontal style={styles.placeContainer4} showsHorizontalScrollIndicator={false}>
        {moodItem?.shopList?.slice(0, 7).map((shop, index) => (
          <TouchableOpacity key={index} style={styles.lastView} onPress={() => onShopPress(shop.id)}>
            <View>
              <ImageBackground source={{ uri: shop.image }} style={styles.shopImage}>
                <View style={styles.hashtagContainer}>
                  <Text style={styles.hashtagText}>{shop.spot}</Text>
                </View>
              </ImageBackground>
              <Text style={styles.lastshoptext} numberOfLines={1} ellipsizeMode="tail">
                {shop.name.length > 7 ? `${shop.name.substring(0, 11)}...` : shop.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShopRecommendation;
