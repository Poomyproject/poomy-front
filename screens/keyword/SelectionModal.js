import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const SelectionModal = ({
    isModalVisible,
    toggleModal,
    isSelectingPlace,
    moodOptions,
    placeOptions,
    selectedMood,
    setSelectedMood,
    applySelection
}) => {
    const options = isSelectingPlace ? placeOptions : moodOptions;

    const handleSelectOption = (option) => {
        setSelectedMood(selectedMood === option ? '' : option);
    };

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            swipeDirection="down"
            style={styles.bottomModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{isSelectingPlace ? "장소" : "분위기"} 선택</Text>
                    <TouchableOpacity onPress={() => setSelectedMood('')}>
                        <Image source={require('../../assets/close.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.moodContainer}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.moodButton, selectedMood === option ? styles.selectedMood : {}]}
                            onPress={() => handleSelectOption(option)}
                        >
                            <Text style={[styles.moodText, selectedMood === option ? styles.selectedMoodText : {}]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={applySelection} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>적용하기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default SelectionModal;
