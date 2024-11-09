import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { fonts } from '../../config/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,

    },
    mainImage: {
        width: '95%',
        height: 200,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center'
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    mainDescription: {
        fontSize: 15,
        color: '#6e6e6e',
        marginTop: 10,
        fontWeight: '500',
    },
    hashtag: {
        fontSize: 15,
        color: colors.Green900,
        marginTop: 5,
        marginRight: 2,
        fontWeight: '500',
    },
    longDescription: {
        marginTop: 20,
        fontSize: 14,
        color: '#6e6e6e',
        marginBottom: 20,
    },
    sectionContainer: {
        marginBottom: 30,
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
        padding: 16,
    },
    sectionHeader: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 3,
        fontWeight: '500'
    },
    sectionLink: {
        color: colors.Green900,
        fontSize: 15,
        marginTop: 4,
        fontWeight: '500',
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 13,
    },
    bigImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center'
    },
    smallImage: {
        width: 100,
        height: 100,
        borderRadius: 3,
    },
    sectionMainDescription: {
        fontSize: 17,
        color: colors.Gray900,
        fontWeight: '500',
        marginVertical: 10,
    },
    sectionDescription: {
        fontSize: 14,
        color: colors.Gray700,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    locationText: {
        marginLeft: 7,
        fontSize: 13,
        color: colors.Gray400,
        marginLeft: 3,
    },
    rightIcon: {
        width: 22,
        height: 22,
        marginTop: 1,
    },
    enddingContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
    poomyIcon: {
        width: 155,
        height: 155,
        marginTop: 10,
        alignSelf: 'center',
    },
    enddingText: {
        color: colors.Gray900,
        textAlign: 'center',
        marginVertical: 2,
        fontWeight: '500'
    },
    line: {
        width: '95%',
        marginVertical: 60,
        alignSelf: 'center',
    },
    enddingBtnText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.Gray900
    },
    thumb: {
        width: 14,
        height: 14,
        color: colors.Green700,
        marginHorizontal:3,
    },
    usefulBtn: {
        flexDirection: 'row',
        textAlign: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.Gray200,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        marginBottom: 130,
        marginTop: 20,
    },
    usefultext: {
        color: colors.Gray300,
        paddingHorizontal: 5,
    },
    usefulcnt: {
        color: colors.Gray300,
    },
    likedBtn: {
        flexDirection: 'row',
        textAlign: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.Green500,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        marginBottom: 130,
        marginTop: 20,
    },
    likedText: {
        color: colors.Green500,
        paddingHorizontal: 5,
    },
    likedcnt: {
        color: colors.Green500,
    }

});

export default styles;
