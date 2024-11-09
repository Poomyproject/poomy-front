import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.Ivory100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 55,
    },
    ResultContainer:{
        flexDirection:'row',
    },
    textInput: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 7,
        width: '80%',
        backgroundColor: colors.Ivory900,
    },
    searchImg: {
        height: 25,
        width: 25,
        marginLeft: '25%',
    },
    XImg:{
        height: 25,
        width: 25,
        // marginLeft: '10%',
    },
    leftArrow: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
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
    infoIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    placeContainer: {
        flexDirection: 'row',
        marginLeft: '2%',
        marginBottom:30,
    },
    keywordText: {
        padding: 5,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.Green500,
        color: colors.Gray700,
        borderRadius: 13,
        textAlign: 'center',
        marginHorizontal: 5,
        fontSize: 13,
        marginTop: '2%',
    },
    storeImg: {
        width: 95,
        height: 95,
        margin: '4%',
        borderRadius:5,
    },
    storeName: {
        marginTop: '10%',
        fontSize: 16,
        fontWeight: '600',
    },
    // store 색바뀌는부분
    highlight: {
        color: colors.Green900, // 원하는 색상으로 변경
        fontWeight: 'bold',
      },
    storeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%',
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
    pinImg: {
        width: 17,
        height: 17,
        borderRadius:2,
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
    heartContainer: {
        marginTop: '13%',
    },
    heartImg: {
        width: 23,
        height: 23,
    },
    searchRankingItem: {
        flexDirection: 'row',
        padding: 11,
    },
    number: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.Green900,
        marginLeft: 5,
        marginTop:1,
    },
    searchRankText: {
        fontSize: 15,
        color: colors.Gray700,
        marginLeft: 16,
        marginTop: 4,
        fontWeight:'500'
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: colors.Gray100,
        opacity: 0.7,
        marginHorizontal: 20,
    },
    line:{
        alignSelf: 'center',
        width:'93%',
        opacity:0.5
    },
    SearchWord: {
        flex: 1, // TextInput이 최대한 너비를 차지하도록 설정
        height: 50,
        paddingHorizontal: 15,
        color: colors.Gray900,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '87%', // 필요한 너비로 조정
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
    },
    imageContainer: {
        paddingRight: 10,
    },
});

export default styles;
