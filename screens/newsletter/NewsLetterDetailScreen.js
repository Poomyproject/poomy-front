import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import ApiClient from '../auth/ApiClient';
import { ActivityIndicator } from 'react-native-paper';
import { NewsLetterContext } from '../context/NewsLetterContext';
import num1Circle from '../../assets/num1_circle.png';
import num2Circle from '../../assets/num2_circle.png';
import num3Circle from '../../assets/num3_circle.png';
import styles from './styles';

const NewsLetterDetailScreen = () => {

    const { selectedNewsLetterId } = useContext(NewsLetterContext);
    const [newsletterData, setNewsletterData] = useState(null);
    const [shopData, setShopData] = useState([]);
    const [isLike, setIsLike] = useState(false); // 좋아요 상태 관리
    const [userFeedback, setUserFeedback] = useState(0); // '유용해요' 개수를 저장할 상태 변수

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 스타일 변경을 위한 조건부 스타일링
    const btnStyle = isLike ? styles.likedBtn : styles.usefulBtn;
    const textStyle = isLike ? styles.likedText : styles.usefultext;
    const cntStyle = isLike ? styles.likedcnt : styles.usefulcnt;
    const imageSource = isLike 
    ? require('../../assets/thumb_liked.png') 
    : require('../../assets/thumb.png');
  

    useEffect(() => {
        const fetchNewletterData = async () => {
            try {
                const response = await ApiClient.get(`/api/newsLetter/${selectedNewsLetterId}`); // shopId를 이용해 API 호출
                setNewsletterData(response.data.response);  // API 응답 데이터를 상태에 저장
                setUserFeedback(response.data.response.userFeedbackCount);

                // 데이터 로그 출력
                // console.log('API 응답:', response.data);

            } catch (err) {
                console.error('API 요청 중 에러 발생:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (selectedNewsLetterId) {
            fetchNewletterData(); // selectedNewsLetterId가 존재할 때만 API 호출
        }
    }, [selectedNewsLetterId]);


    // 좋아요 상태를 토글하는 함수
    const toggleLike = async () => {
        try {
            setLoading(true); // 로딩 상태 설정

            let response;

            if (isLike) {
                // 현재 좋아요가 되어 있다면, unlike 엔드포인트 호출
                response = await ApiClient.post(`/api/newsLetter/${selectedNewsLetterId}/unlike`);
            } else {
                // 좋아요가 안 되어 있다면, like 엔드포인트 호출
                response = await ApiClient.post(`/api/newsLetter/${selectedNewsLetterId}/like`);
            }

            // 서버 응답에 따라 isLike 상태 업데이트
            setIsLike(response.data.response.isLike);
            setUserFeedback(response.data.response.user_feedback); // 유용해요 개수 업데이트

            console.log('API 좋아요 응답:', response.data);

        } catch (err) {
            console.error('API 요청 중 에러 발생:', err);
            setError(err);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };


    // newsletterData가 업데이트될 때마다 shopData를 업데이트하는 useEffect 추가
    useEffect(() => {
        if (newsletterData) {
            setShopData([
                {
                    id: 1,
                    circleImg: num1Circle,
                    name: newsletterData?.firstShopName,
                    description: newsletterData?.firstShopTitle,
                    longDescription: newsletterData?.firstShopText,
                    location: newsletterData?.firstShopLocation,
                    imageUri: newsletterData?.firstShopImage1,
                    smallImages: [
                        newsletterData?.firstShopImage2,
                        newsletterData?.firstShopImage3,
                        newsletterData?.firstShopImage4
                    ],
                },
                {
                    id: 2,
                    circleImg: num2Circle,
                    name: newsletterData?.secondShopName,
                    description: newsletterData?.secondShopTitle,
                    longDescription: newsletterData?.secondShopText,
                    location: newsletterData?.secondShopLocation,
                    imageUri: newsletterData?.secondShopImage1,
                    smallImages: [
                        newsletterData?.secondShopImage2,
                        newsletterData?.secondShopImage3,
                        newsletterData?.secondShopImage4
                    ],
                },
                {
                    id: 3,
                    circleImg: num3Circle,
                    name: newsletterData?.thirdShopName,
                    description: newsletterData?.thirdShopTitle,
                    longDescription: newsletterData?.thirdShopText,
                    location: newsletterData?.thirdShopLocation,
                    imageUri: newsletterData?.thirdShopImage1,
                    smallImages: [
                        newsletterData?.thirdShopImage2,
                        newsletterData?.thirdShopImage3,
                        newsletterData?.thirdShopImage4,
                    ],
                }

                

            ]);
        }
    }, [newsletterData]); // newsletterData가 변경될 때 shopData 업데이트

    if (loading) {
        return <ActivityIndicator size="large" color={colors.Green900} />;
    }

    if (error) {
        return (
            <View>
                <Text>에러 발생: {error.message}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Main Section with Image, Title, and Description */}
            <Image
                source={{ uri: newsletterData?.mainPhoto }}
                style={styles.mainImage}
            />
            <View style={{ padding: 10, alignSelf: 'center' }}>
                <Text style={styles.mainTitle}>{newsletterData?.headline}</Text>
                <Text style={styles.mainDescription}>{newsletterData?.subtopic}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.hashtag}>#{newsletterData?.keyword1}</Text>
                    <Text style={styles.hashtag}>#{newsletterData?.keyword2}</Text>
                    <Text style={styles.hashtag}>#{newsletterData?.keyword3}</Text>
                </View>

                <Text style={styles.longDescription}>
                    {newsletterData?.textTop}
                </Text>
            </View>

            <View style={styles.sectionContainer}>
                {/* Mapping over shopData array */}
                {shopData.map((shop, index) => (
                    <View key={shop.id}>

                        {/* 샵 헤더 */}
                        <View style={styles.sectionHeader}>
                            <View style={{ width: '76%', flexDirection: 'row' }}>
                                <Image source={shop.circleImg} style={styles.rightIcon} />
                                <Text style={styles.sectionTitle}>{shop.name}</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text style={styles.sectionLink}>바로가기</Text>
                                <Image source={require('../../assets/right.png')} style={styles.rightIcon} />
                            </TouchableOpacity>
                        </View>

                        {/* 샵 이미지 */}
                        <Image
                            source={{ uri: shop.imageUri }}
                            style={styles.bigImage}
                        />
                        <View style={styles.imageRow}>
                            {shop.smallImages.map((smallImageUri, idx) => (
                                <Image key={idx} source={{ uri: smallImageUri }} style={styles.smallImage} />
                            ))}
                        </View>

                        {/* 샵 설명 */}
                        <Text style={styles.sectionMainDescription}>{shop.description}</Text>
                        <Text style={styles.sectionDescription}>{shop.longDescription}</Text>

                        {/* 샵 위치 */}
                        <View style={styles.locationContainer}>
                            <Image source={require('../../assets/pin.png')} style={styles.rightIcon} />
                            <Text style={styles.locationText}>{shop.location}</Text>
                        </View>

                        {index !== shopData.length - 1 && <View style={{ marginTop: 70 }} />}
                    </View>
                ))}
            </View>

            {/* 마무리 멘트 */}
            <View style={styles.enddingContainer}>
                <Image source={require('../../assets/NewsPoomy.png')} style={styles.poomyIcon} />
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.enddingText}>{newsletterData?.textBottom}</Text>
                </View>
            </View>

            {/* 유용해요 버튼설명 */}
            <Image source={require('../../assets/Newsline.png')} style={styles.line} />
            <Text style={styles.enddingBtnText}>오늘의 뉴스레터는 어떠했나요?</Text>
            <Text style={styles.enddingText}>당신의 의견을 알려주세요. {"\n"}</Text>

            {/* 유용해요 버튼 */}
            <TouchableOpacity style={btnStyle} onPress={toggleLike} disabled={loading}>
                <Image source={imageSource} style={styles.thumb} />
                <Text style={textStyle}>유용해요</Text>
                <Text style={cntStyle}>{userFeedback} </Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default NewsLetterDetailScreen;