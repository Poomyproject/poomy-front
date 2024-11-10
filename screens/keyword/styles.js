import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    down: {
        width: 14,
        height: 8,
        marginLeft: 6,
    },
    close: {
        width: 20,
        height: 20,
        marginLeft: 6,
    },
    buttoncontainer: {
        flexDirection: 'row',
        // alignItems: 'center', // 수직 정렬 (필요에 따라 변경 가능)
        // justifyContent: 'flex-start', // 왼쪽 정렬
    },
    keywordText: {
        alignSelf: 'flex-start',
        padding: 10, // 텍스트 주위의 여백
        paddingHorizontal: 12,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Gray200, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 18, // 테두리 모서리 둥글게 하기
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
    newletter: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginRight: 10,
    },
    searchImg: {
        width: 30,
        height: 30,
    },
    leftarrow: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    searchImg: {
        height: 25,
        width: 25,
        marginLeft: '10%'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 55,
    },

    // 선택하기 전 button
    textInput: {
        flexDirection: 'row',
        height: 35,
        paddingHorizontal: 15, // 입력 내용과 테두리 사이의 여백
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.Gray200,
        alignItems: 'center',
        backgroundColor: colors.Ivory100,
        justifyContent: 'center',
    },
    // 선택하기 전 text
    defaultTextStyle: {
        color: colors.Gray900,
    },
    // 선택한 후 button
    selectedButton: {
        backgroundColor: colors.Green900,
        borderColor: colors.Green900,
    },
    // 선택한 후 text
    selectedTextStyle: {
        color: colors.Ivory100,
    },

    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    searchButtonText: {
        color: colors.Gray300,
    },
    itemText: {
        padding: 10,
    },
    number: {
        fontSize: 20,
        fontWeight: 1000,
        color: colors.Green900,
        marginLeft: 13,
    },
    serachRankText: {
        fontSize: 15,
        color: colors.Gray300,
        marginLeft: 23,
        marginTop: 1,
    },

    separator: {
        borderBottomWidth: 1, // 선의 두께
        borderColor: colors.Gray100, // 선의 색상
        opacity: 0.7,
        marginHorizontal: 20,
    },

    keywordText: {
        alignSelf: 'flex-start',
        padding: 8, // 텍스트 주위의 여백
        paddingHorizontal: 13,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Gray200, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 16, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: 14,
        marginTop: '2%',
        // fontWeight: 'bold',
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: 50,
        // backgroundColor:'black',
        marginLeft: '5%',
        marginTop: '2%'
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'flex-start',
        marginLeft: '3%',
    },
    poomyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Green900,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.Gray900,
    },
    heartImg: {
        width: 23,
        height: 23,
    },
    pinImg: {
        width: 17,
        height: 17,
        borderRadius:2,
    },
    storeName: {
        marginTop: '11%',
        fontSize: 15,
        fontWeight: '500',
    },
    infoIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: colors.Ivory100,
        marginTop: 20,
        padding: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'flex-start',
    },

    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    text: {
        flex: 1,
        ...fonts.Body1,
    },

    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },

    moodButton: {
        borderWidth: 1,
        borderColor: colors.Gray100,
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        marginTop: 10,
    },

    selectStyle: {
        borderWidth: 1,
        borderColor: colors.Green500,
        padding: 6,
        margin: 5,
        borderRadius: 16,
        fontSize: 12,
        Color: colors.Ivory100,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    moodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        marginRight: 100,
    },

    selectedMood: {
        backgroundColor: colors.Green900,
    },

    moodText: {
        fontSize: 16,
        color: colors.Gray900,
    },

    closeButton: {
        width: 350,
        height: 48,
        backgroundColor: colors.Green900,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 110,
        marginBottom: 20,
    },

    closeButtonText: {
        color: colors.Ivory100,
        fontSize: 15,
    },
    // 여기부터 욘짱

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalContent: {
        backgroundColor: colors.Ivory100,
        marginTop: 20,
        padding: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'flex-start',
    },

    textContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    text: {
        flex: 1,
        ...fonts.Body1,
    },

    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
    },

    moodButton: {
        borderWidth: 1,
        borderColor: colors.Gray100,
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        marginTop: 10,
    },

    selectStyle: {
        borderWidth: 1,
        borderColor: colors.Green500,
        padding: 6,
        margin: 5,
        borderRadius: 16,
        fontSize: 12,
        Color: colors.Ivory100,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    moodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        marginRight: 100,
    },

    selectedMood: {
        backgroundColor: colors.Green900,
    },

    closeButton: {
        width: 350,
        height: 48,
        backgroundColor: colors.Green900,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 110,
        marginBottom: 20,
    },

    closeButtonText: {
        color: colors.Ivory100,
        fontSize: 15,
    },
    menuContainer: {
        alignItems: 'flex-end',  // 메뉴가 오른쪽에 배치되도록 설정
        marginBottom: 10,
    },
    menuButton: {
        alignSelf: 'flex-end',  // 버튼을 오른쪽에 배치
    },
    menuDropdown: {
        position: 'absolute',  // 절대 위치 설정
        top: 55,               // 버튼 아래로 드롭다운 이동 (버튼 높이에 따라 조정 필요)
        width: 'auto',         // 드롭다운 폭 조정
        zIndex: 1,             // 드롭다운을 다른 요소 위로 표시하기 위한 설정
    },
    ResultContainer:{
        flexDirection:'row',
    },
    storeImg: {
        width: 95,
        height: 95,
        margin: '4%',
        borderRadius:5,
    },
    storeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%',
    },
    storeInfo: {
        padding: 5,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.Gray200,
        color: colors.Gray700,
        borderRadius: 13,
        textAlign: 'center',
        fontSize: 13,
        marginTop: '2%',
    },
    interestInfo:{
        borderColor: colors.Green900, 
        color:colors.Green900
    },
    addressContainer: {
        flexDirection: 'row',
        marginTop: '5%',
        width:'85%',
    },
    addressText:{
        fontSize:13,
        color:colors.Gray500,
        marginLeft:'1%',
    },
    heartContainer: {
        marginTop: '13%',
    },
});

export default styles;
