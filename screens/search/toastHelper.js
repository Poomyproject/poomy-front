import Toast from 'react-native-toast-message';

export const showToast = () => {
    Toast.show({
        type: 'success',
        text1: 'POOMY에서 직접 방문하여 선정한 매장의 분위기 키워드입니다',
        position: 'center',
        topOffset: 160,
    });
};
