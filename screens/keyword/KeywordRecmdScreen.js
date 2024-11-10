import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Provider } from 'react-native-paper';
import Modal from 'react-native-modal';
import { KeywordContext } from './KeywordContext';
import { MoodContext } from './MoodContext';
import styles from './styles';
import PlaceMoodButtons from './PlaceMoodButtons';
import SelectionModal from './SelectionModal';

const KeywardRecmdScreen = ({ navigation }) => {
    const { selectedSpotName } = useContext(KeywordContext);
    const { selectedMoodId } = useContext(MoodContext);

    const [interestPlace, setInterestPlace] = useState('');
    const [interestMood, setInterestMood] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelectingPlace, setIsSelectingPlace] = useState(false);
    const [selectedMood, setSelectedMood] = useState('');

    const moodOptions = ['아기자기', '모던', '빈티지', '럭셔리', '테마별'];
    const placeOptions = ['강남', '명동', '북촌 한옥마을', '성수', '송리단길', '영등포', '이태원', '종로', '혜화', '홍대'];

    useEffect(() => {
        if (selectedSpotName && placeOptions.includes(selectedSpotName)) {
            setInterestPlace(selectedSpotName);
        }
        if (selectedMoodId && moodOptions.includes(selectedMoodId)) {
            setInterestMood(selectedMoodId);
        }
    }, [selectedSpotName, selectedMoodId]);

    const toggleModal = (isPlace = false) => {
        setIsSelectingPlace(isPlace);
        setModalVisible(!isModalVisible);
    };

    const applySelection = () => {
        if (isSelectingPlace && selectedMood) {
            setInterestPlace(selectedMood);
        } else if (!isSelectingPlace && selectedMood) {
            setInterestMood(selectedMood);
        }
        setSelectedMood('');
        setModalVisible(false);
    };

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <PlaceMoodButtons
                    interestPlace={interestPlace}
                    interestMood={interestMood}
                    toggleModal={toggleModal}
                    setInterestPlace={setInterestPlace}
                    setInterestMood={setInterestMood}
                />

                <SelectionModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    isSelectingPlace={isSelectingPlace}
                    moodOptions={moodOptions}
                    placeOptions={placeOptions}
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    applySelection={applySelection}
                />
            </ScrollView>
        </Provider>
    );
};

export default KeywardRecmdScreen;
