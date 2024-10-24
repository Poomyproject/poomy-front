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
    textInput: {
        height: 50,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: '80%',
        backgroundColor: colors.Ivory900,
    },
    searchImg: {
        height: 25,
        width: 25,
        marginLeft: '10%',
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
        margin: '5%',
    },
    storeName: {
        marginTop: '11%',
        fontSize: 16,
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
    },
    pinImg: {
        width: 17,
        height: 17,
    },
    storeInfo: {
        padding: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.Green500,
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
        padding: 13,
    },
    number: {
        fontSize: 20,
        fontWeight: '1000',
        color: colors.Green900,
        marginLeft: 13,
    },
    searchRankText: {
        fontSize: 15,
        color: colors.Gray300,
        marginLeft: 23,
        marginTop: 1,
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: colors.Gray100,
        opacity: 0.7,
        marginHorizontal: 20,
    },
});

export default styles;
