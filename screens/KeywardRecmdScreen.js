import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import colors from '../config/colors';


const KeywardRecmdScreen = () => {
  return (
    <View style={styles.container}>
      <View horizontal={true} style={styles.placeContainer} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>아기자기한</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.keywordText}>모던</Text>
                        </TouchableOpacity>
                        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor:'white'
        
    },
    keywordText: {
        alignSelf: 'flex-start',
        padding: 5, // 텍스트 주위의 여백
        paddingHorizontal: 12,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Green500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 13, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        marginTop: '2%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: 50,
        // backgroundColor:'black',
        marginLeft: '2%',
    },
})
export default KeywardRecmdScreen;
