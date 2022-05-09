import React, {useState} from 'react' ;
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Card from "../components/CustomCard/Card";
import CarSwiper from '../components/CustomCard/CardSwiper.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../app/api/client';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { pets } from '../data/data';
import LoadingScreen from './LoadingScreen';

import Video from 'react-native-video';
import CardSwiper from '../components/CustomCard/CardSwiper.js';
import SwipeCards from 'react-native-swipe-cards';

const like = require('../assets/images/like.png')
const plus = require('../assets/images/plus.png')
const dislike = require('../assets/images/dislike.png')
const tinder = require('../assets/images/icon-tindeirb.png')

const img = require('../assets/images/pet1.jpg')

const MatchScreen = ({navigation}) => {
    const [username, setUsername] = useState(async () => {
        const username = await AsyncStorage.getItem('username') 
        setUsername(username)
    });
    const [match,setMatch] = useState(false);
    const fetchCard =  async () =>{
        console.log("let's fetch a handful of Cards")
        let username = await AsyncStorage.getItem("username")
        const res = await client.post('/cardInfo',{
            username
        })
        await AsyncStorage.setItem('isAdmin', JSON.stringify(res.data.isAdmin))
        setCardArray(res.data.data)
        setCurrentCard(res.data.data[0])
        //console.log(res.data.data)
        return res.data.data
    }
    const [currentCard,setCurrentCard] = useState(null)
    const [cardarray, setCardArray] = useState(async () => {
        const cardarray = fetchCard()
    });

    const onLikePressed = async() => {
        console.log(currentCard)
        setCurrentCard(cardarray[0])
        if(cardarray.length == 2){
            setCardArray(fetchCard);
        }
        if (currentCard){
            console.log(username + " a like " + currentCard.user_name)
        }
        let liker = username
        let liked = currentCard.user_name
        const res = await client.post('/like',{
            liker,liked
        })
        setMatch(res.data.data)
        cardarray.shift()
        setCurrentCard(cardarray[0])
    }

    const onDislikePressed = () => {
        setMatch(false)
        setCurrentCard(cardarray[0])
        if(cardarray.length == 2){
            setCardArray(fetchCard);
        }
        if (currentCard){
            console.log(username + " a dislike " + currentCard.user_name)
        }
        cardarray.shift()
        setCurrentCard(cardarray[0])

    }

    const onSwipeLike = async() => {
        console.log(currentCard)
        setCurrentCard(cardarray[0])
        if(cardarray.length == 2){
            setCardArray(fetchCard);
        }
        if (currentCard){
            console.log(username + " a like " + currentCard.user_name)
        }
        let liker = username
        let liked = currentCard.user_name
        const res = await client.post('/like',{
            liker,liked
        })
        setMatch(res.data.data)
        cardarray.shift()
        setCurrentCard(cardarray[0])
    }

    const onSwipeDislike = () => {
        setMatch(false)
        setCurrentCard(cardarray[0])
        if(cardarray.length == 2){
            setCardArray(fetchCard);
        }
        if (currentCard){
            console.log(username + " a dislike " + currentCard.user_name)
        }
        cardarray.shift()
        setCurrentCard(cardarray[0])
    }
    if (currentCard == null || cardarray == null){
        return (
            <LoadingScreen/>
        )
    }
    else{
        return (
            <View style={styles.container}>
                <Image source={tinder} style={styles.tinder}/>
                <View style={styles.button_nav}>
                    {/* <Text>
                        {currentCard.user_name}
                    </Text> */}
                    {match == true && (
                        <Text>
                            It's a Match !!
                        </Text>
                    )}
                    {cardarray.length !=2 && (
                        <SwipeCards
                        cards={cardarray}
                        loop={false}
                        containerStyle={{borderradius:20}}
                        renderCard={(cardData) => <Card {...cardData} />}
                        //renderNoMoreCards
                        showYup={false}
                        showNope={false}
                        smoothTransition={true}

                        handleYup={onSwipeLike}
                        handleNope={onSwipeDislike}
                    />
                    )}
                    {cardarray.length !=2 && (
                    <View style={styles.circle_like}>
                        <TouchableOpacity onPress={onLikePressed}>
                            <Image
                                source = {like}
                                style={styles.like_style}
                            />
                        </TouchableOpacity>
                    </View>
                    )}
                    {cardarray.length !=2 && (
                    <View style={styles.circle_dislike}>
                        <TouchableOpacity onPress={onDislikePressed}>
                        <Image
                            source = {dislike}
                            style={styles.dislike_style}
                            />
                        </TouchableOpacity>
                    </View>  
                    )}  
                    {cardarray.length ==2 && (
                    <View style={styles.circle_new_cards}>
                        <TouchableOpacity onPress={onLikePressed}>
                            <Image
                                source = {plus}
                                style={styles.new_cards}
                            />
                        </TouchableOpacity>
                    </View>
                    )}
                </View>
            </View>
        )
    }
}

export default  MatchScreen


const styles = StyleSheet.create({
    container:{
        flex:0,
        alignItems:'center',
        justifyContent: 'center',
        top:50,
    },
    button_nav:{
        alignSelf: 'center',
        flexDirection: "row",
        height: 100,
        padding: 7,
        justifyContent : 'space-between',
    },

    cardswipe:{
        width: 1000,
        height: 1000,
    },

    buttons:{
        width: 75,
        height: 75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:100,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'lightgrey',
        top: 10,
        margin: 10,
    },

    tinder:{
        top: 10,
        height: 30,
        width: 200,
    },

    like_style:{
        top: 10,
        height: 50,
        width: 50,
    },
    new_cards:{
        top: 10,
        height: 50,
        width: 50,
    },

    circle_new_cards:{
        alignItems: 'center',
        top: 540,
        height: 70,
        width: 70,
        left: 0,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'blue',
    },

    circle_like:{
        alignItems: 'center',
        top: 540,
        height: 70,
        width: 70,
        left: 0,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'green',
    },

    dislike_style:{
        top: 10,
        height: 50,
        width: 50,
    },

    circle_dislike:{
        alignItems: 'center',
        top: 540,
        height: 70,
        width: 70,
        right: 230,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'red',
    },

})