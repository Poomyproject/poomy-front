import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white', //여기바꾸면 뒷배경 바뀜
    },
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: '100%',
        height: '9%',
        resizeMode: 'contain',
        marginTop: height * 0.05,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        width: '90%',
        backgroundColor: colors.Ivory900,
        borderRadius: 10,
    },
    searchText: {
        flex: 1,
        color: colors.Gray300,
        padding: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    rightIconContainer: {
        flexDirection: 'row',
        marginTop: 45,
        marginHorizontal: 20,
        alignSelf: 'flex-start'
    },
    LocationRcmd: {
        flexDirection: 'row',
        marginTop: 35,
        marginHorizontal: 20,
        alignSelf: 'flex-start'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Gray900,
        width: '80%',
        marginLeft: 5,
    },
    sectionTitle_sec: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Gray900,
    },
    sectionTitle_sec_color: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.Green900,
    },
    sectionTitle_sec_view: {
        width: '90%',
        flexDirection: 'row',
        marginLeft: 5,
    },
    rightText: {
        color: colors.Gray900,
        marginTop: 5,
    },
    rightIcon: {
        width: 24,
        height: 24,
        marginTop: 1,
    },
    newletter: {
        width: 85,
        height: 85,
        marginTop: '3%',
        marginLeft: '3.5%',
        borderRadius: 4,
    },
    newletterMainText: {
        marginTop: '8%',
        fontSize: 15,
        color: colors.Gray900,
        fontWeight: 'bold',
    },
    newletterDetailText: {
        marginTop: '3%',
        fontSize: '13%',
        color: colors.Gray500,
        lineHeight: 20, // 줄 간격을 조절하여 텍스트가 읽기 쉽게 함
        textAlign: 'left',
        width: 260,
    },
    placeContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    placeContainer2: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    placeContainer3: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    placeContainer4: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    placeText: {
        fontSize: 13,
        marginTop: 15,
        color: colors.Gray700,
    },
    keword: {
        flexDirection: 'row',
        marginLeft: '7%',
        marginTop: '3%'
    },
    keword_text: {
        alignSelf: 'flex-start',
        padding: 10, // 텍스트 주위의 여백
        paddingHorizontal: 15,
        borderWidth: 1, // 테두리 두께
        borderColor: colors.Green500, // 테두리 색상
        color: colors.Gray700,
        borderRadius: 19, // 테두리 모서리 둥글게 하기
        textAlign: 'center', // 텍스트 가운데 정렬 (필요시)
        marginHorizontal: 5,
        fontSize: '14%',
        // fontWeight: 'bold',
    },
    shopImage: {
        width: 150,
        height: 150,
    },
    themeImg: {
        width: 58,
        height: 58,
    },
    errorText: {
        padding: 80,
    },
    box: {
        width: 130, // 각 아이템의 너비
        height: 170, // 각 아이템의 높이
        borderRadius: 8,
        overflow: 'hidden', // 경계 밖으로 나가는 요소 숨기기
        margin: 10,
    },
    hashtagContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.Ivory100,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: colors.Green500,
        borderWidth: 1,
    },
    hashtagText: {
        padding: 2,
        fontSize: 12,
        color: 'black',
    },
    overlay: {
        padding: 10,
    },
    boxshopImage: {
        width: 130,
        height: 170,
        justifyContent: 'flex-end', // 이미지 위에 텍스트를 아래쪽에 배치
    },
    shopName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteText: {
        marginTop: 0,
        marginLeft: 5,
        fontSize: 14,
        color: colors.Ivory900,
    },
    mainheart: {
        marginTop: 1,
        width: 15,
        height: 15,
    },
    gradientbox: {
        width: 130,
        height: 80, // 그라디언트 이미지 높이 설정
        position: 'absolute',
        bottom: 0, // 아래쪽에 그라디언트 배치
    },
    lastshoptext: {
        marginLeft: 10,
        marginTop: 10,
        color: colors.Gray900,
        fontWeight: 'bold',
    },
    lastView: {
        marginTop: 10,
        height: 190,
        alignItems: 'center',
        marginLeft: 25,
        // iOS 그림자 효과
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,  // Increase shadowRadius for a more noticeable shadow

        // 배경색 설정 (그림자가 잘 보이게 하기 위해 필요할 수 있음)
        backgroundColor: 'white',
        borderRadius: 10,  // 모서리를 둥글게 하기 위해
        borderWidth: 1,
        borderColor: colors.Gray100,
    }
});

export default styles;
