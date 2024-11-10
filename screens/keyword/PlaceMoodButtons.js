import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const PlaceMoodButtons = ({ interestPlace, interestMood, toggleModal, setInterestPlace, setInterestMood }) => {
    return (
        <View style={styles.buttoncontainer}>
            <View style={{ width: '80%', flexDirection: 'row' }}>

                {/* 장소 모달 */}
                <TouchableOpacity
                    onPress={() => toggleModal(true)}
                    style={[styles.textInput, interestPlace ? styles.selectedButton : {}]}
                >
                    <Text style={interestPlace ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestPlace || "장소"}
                    </Text>
                    {interestPlace ? (
                        <TouchableOpacity onPress={() => setInterestPlace(null)}>
                            <Image source={require('../../assets/85-close.png')} style={styles.close} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../../assets/down.png')} style={styles.down} />
                    )}
                </TouchableOpacity>

                <View style={{ marginLeft: 10 }} />

                {/* 분위기 모달 */}
                <TouchableOpacity
                    onPress={() => toggleModal(false)}
                    style={[styles.textInput, interestMood ? styles.selectedButton : {}]}
                >
                    <Text style={interestMood ? styles.selectedTextStyle : styles.defaultTextStyle}>
                        {interestMood || "분위기"}
                    </Text>
                    {interestMood ? (
                        <TouchableOpacity onPress={() => setInterestMood(null)}>
                            <Image source={require('../../assets/85-close.png')} style={styles.close} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../../assets/down.png')} style={styles.down} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlaceMoodButtons;
