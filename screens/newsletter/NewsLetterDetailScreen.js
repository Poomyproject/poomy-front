import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

const NewsLetterDetailScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Main Section with Image, Title, and Description */}
            <Image
                source={{ uri: 'https://via.placeholder.com/600x400' }}
                style={styles.mainImage}
            />
            <View style={{
                padding: 10, alignSelf: 'center'
            }}>
                <Text style={styles.mainTitle}>데이트하기 좋은 성수 근처</Text>
                <Text style={styles.mainDescription}>
                    5~6월에 하기 좋은 데이트들을 전부 모아
                </Text>
                <Text style={styles.hashtag}>#데이트 #연인과 #친구와</Text>
                <Text style={styles.longDescription}>
                    안녕하세요. Poomy입니다. 많이 날씨가 더워졌죠? 네 너무 더워요.
                    지금 너무 더워서 피곤하고 근데 날씨는 안풀리고 뭔소린지 모르겠죠?
                    네 저도 모릅니다. 왜냐하면 지금 그냥 예시로 한 번 써보고 있거든요.
                    그렇다면 데이트하기 좋은 성수 근처 한 번 알아볼까요^^
                </Text>
            </View>


            <View style={styles.sectionContainer}>
                {/* Section 1 */}
                <View style={styles.sectionHeader}>
                    <View style={{ width: '76%', flexDirection: 'row', }}>
                        <Image source={require('../../assets/num1_circle.png')} style={styles.rightIcon} />
                        <Text style={styles.sectionTitle}>소품샵 이름 </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', }}>
                        <Text style={styles.sectionLink}> 바로가기</Text>
                        <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{ uri: 'https://via.placeholder.com/600x400' }}
                    style={styles.bigImage}
                />
                <View style={styles.imageRow}>
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                </View>

                <Text style={styles.sectionMainDescription}>소품샵 한줄 소개 !</Text>
                <Text style={styles.sectionDescription}>
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                </Text>

                <View style={styles.locationContainer}>
                    <Image source={require('../../assets/pin.png')} style={styles.rightIcon} />
                    <Text style={styles.locationText}>3번 소품샵 위치</Text>
                </View>

                {/* Section 2 */}
                <View style={{ marginTop: 70, }} />
                <View style={styles.sectionHeader}>
                    <View style={{ width: '76%', flexDirection: 'row', }}>
                        <Image source={require('../../assets/num2_circle.png')} style={styles.rightIcon} />
                        <Text style={styles.sectionTitle}>소품샵 이름 </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', }}>
                        <Text style={styles.sectionLink}> 바로가기</Text>
                        <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{ uri: 'https://via.placeholder.com/600x400' }}
                    style={styles.bigImage}
                />
                <View style={styles.imageRow}>
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                </View>

                <Text style={styles.sectionMainDescription}>소품샵 한줄 소개 !</Text>
                <Text style={styles.sectionDescription}>
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                </Text>

                <View style={styles.locationContainer}>
                    <Image source={require('../../assets/pin.png')} style={styles.rightIcon} />
                    <Text style={styles.locationText}>3번 소품샵 위치</Text>
                </View>

                {/* Section 3 */}
                <View style={{ marginTop: 70, }} />
                <View style={styles.sectionHeader}>
                    <View style={{ width: '76%', flexDirection: 'row', }}>
                        <Image source={require('../../assets/num3_circle.png')} style={styles.rightIcon} />
                        <Text style={styles.sectionTitle}>소품샵 이름 </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', }}>
                        <Text style={styles.sectionLink}> 바로가기</Text>
                        <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{ uri: 'https://via.placeholder.com/600x400' }}
                    style={styles.bigImage}
                />
                <View style={styles.imageRow}>
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                    <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.smallImage} />
                </View>

                <Text style={styles.sectionMainDescription}>소품샵 한줄 소개 !</Text>
                <Text style={styles.sectionDescription}>
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                    3번 소품샵 콘텐츠 글 3번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글 1번 소품샵 콘텐츠 글
                </Text>

                <View style={styles.locationContainer}>
                    <Image source={require('../../assets/pin.png')} style={styles.rightIcon} />
                    <Text style={styles.locationText}>3번 소품샵 위치</Text>
                </View>
                <View style={{ marginBottom: 20, }} />
            </View>

            <View style={styles.enddingContainer}>
                <Image source={require('../../assets/NewsPoomy.png')} style={styles.poomyIcon} />
                <View style={{ marginTop: 50, }}>
                    <Text style={styles.enddingText}>오늘 Poomy가 추천해준</Text>
                    <Text style={styles.enddingText}>빈티지 분위기 소품샵, 어떠셨나요? {"\n"}</Text>
                    <Text style={styles.enddingText}>추천드린 소품샵들을 다니면서</Text>
                    <Text style={styles.enddingText}>여러분들의 추억여행도 떠나면 좋겠어요! {"\n"}</Text>
                    <Text style={styles.enddingText}>다음 뉴스레터에서는</Text>
                    <Text style={styles.enddingText}>또 어떤 숨겨진 소품샵들을 소개할지 기대해주세요! {"\n"}</Text>
                </View>
            </View>

            <Image source={require('../../assets/Newsline.png')} style={styles.line} />
            <Text style={styles.enddingBtnText}>오늘의 뉴스레터는 어떠했나요?</Text>
            <Text style={styles.enddingText}>당신의 의견을 알려주세요. {"\n"}</Text>
            <TouchableOpacity style={styles.usefulBtn}>
                <Image source={require('../../assets/thumb.png')}  style={styles.thumb}/>
                <Text style={styles.usefultext}>유용해요</Text>
                <Text style={styles.usefulcnt}>0</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

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
    },
    hashtag: {
        fontSize: 15,
        color: colors.Green900,
        marginTop: 5,
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
    sectionNumber: {
        backgroundColor: colors.Green900,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100,
        fontSize: 14,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 3,
    },
    sectionLink: {
        color: colors.Green900,
        fontSize: 16,
        marginTop: 3,
        fontWeight: '600',
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
        fontSize: 14,
        color: colors.Gray700,
    },
    rightIcon: {
        width: 24,
        height: 24,
        marginTop: 1,
    },
    enddingContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
    poomyIcon: {
        width: 170,
        height: 170,
        marginTop: 1,
        alignSelf: 'center',
    },
    enddingText: {
        color: colors.Gray900,
        textAlign: 'center',
        marginVertical:2,
        fontWeight:'500'
    },
    line: {
        width: '95%',
        marginVertical: 60,
        alignSelf: 'center',
    },
    enddingBtnText:{
        fontWeight:'bold',
        textAlign: 'center',
        color: colors.Gray900
    },
    usefulBtn:{
        flexDirection:'row',
        textAlign: 'center',
        alignSelf: 'center',
        borderWidth:1,
        borderColor:colors.Gray200,
        borderRadius:5,
        padding:10,
        paddingHorizontal:15,
        marginBottom:130,
        marginTop:20,
    },
    usefultext:{
        color:colors.Gray300,
        paddingHorizontal:5,
    },
    thumb:{
        width:15,
        height:15,
    },
    usefulcnt:{
        color:colors.Gray300,
    }
});

export default NewsLetterDetailScreen;
