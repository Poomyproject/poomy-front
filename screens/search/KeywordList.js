import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
import { KeywordContext } from '../keyword/KeywordContext'
import { MoodContext } from '../keyword/MoodContext';
import { useNavigation } from '@react-navigation/native';

const KeywordList = ({ onInfoPress }) => {
    const navigation = useNavigation(); // 이걸 추가해 주세요.
    const keywords = ['아기자기', '모던', '빈티지', '럭셔리', '테마별'];

    // Keyword 페이지로 넘겨주는 코드
    const { setSelectedSpotName } = useContext(KeywordContext);
    const { setSelectedMoodId } = useContext(MoodContext);

    const handleMood = (moodId) => {
        setSelectedSpotName(''); // Reset keyword when mood is selected
        setSelectedMoodId(moodId);
        navigation.navigate('KeywordStack', { screen: 'Keyword', params: { moodId } });
    };
    return (
        <>
            <View style={styles.rightIconContainer}>
                <Text style={styles.poomyTitle}>POOMY</Text>
                <Text style={styles.sectionTitle}>의 추천 키워드</Text>
                <TouchableOpacity onPress={onInfoPress}>
                    <Image source={require('../../assets/alert-circle.png')} style={styles.infoIcon} />
                </TouchableOpacity>
            </View>

            <View horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                {keywords.map((keyword, index) => (
                    <TouchableOpacity key={index} onPress={() => handleMood(keyword)}>
                        <Text style={styles.keywordText}>{keyword}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

export default KeywordList;
