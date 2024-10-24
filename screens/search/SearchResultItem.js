import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const SearchResultItem = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
        {/* 소품샵 사진 */}
        <Image source={item.image} style={styles.storeImg} />

        {/* 소품샵 정보 */}
        <View style={{ width: '55%' }}>
            <Text style={styles.storeName}>{item.name}</Text>
            <View style={styles.storeDetails}>
                <Text style={styles.storeInfo}>{item.category}</Text>
                <Text style={styles.storeInfo}>{item.location}</Text>
            </View>
            <View style={styles.addressContainer}>
                <Image source={require('../../assets/map-pin.png')} style={styles.pinImg} />
                <Text>{item.address}</Text>
            </View>
        </View>

        {/* 찜 */}
        <TouchableOpacity style={styles.heartContainer}>
            <Image source={require('../../assets/heart.png')} style={styles.heartImg} />
        </TouchableOpacity>
    </View>
);

export default SearchResultItem;
