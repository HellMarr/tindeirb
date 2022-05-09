import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Card from "./Card";

import SwipeCards from 'react-native-swipe-cards';
//import { useDispatch, useSelector } from "react-redux";

const CardSwiper = () =>{
    //const userData = useSelector((state) => state.user);

    useEffect(() => {
        //let users=userData;
    })

    const [cards, setCards] = useState([
        { name: 'Chien', age:'16',bio:' ceci est une bio',image: require('../../assets/images/pet2.jpg')},
        { name: 'Alex', age:'17',bio:'bio2',image: require('../../assets/images/pet3.jpg')},
        { name: 'Martin', age:'17',bio:'bio3',image: require('../../assets/images/pet4.jpg')},
        { name: 'Yoan', age:'17',bio:'bio3',image: require('../../assets/images/pet5.jpg')},
        { name: 'Rayan', age:'17',bio:'bio3',image: require('../../assets/images/pet1.jpg')},
    ]);

    function handleYup(card) {
        console.log("yup");
        console.log(card);
    }
    function handleNope(card) {
        console.log("nop");
    }

    return (
        <SwipeCards
            cards={cards}
            loop={false}
            containerStyle={{borderradius:20}}
            renderCard={(cardData) => <Card {...cardData} />}
            //renderNoMoreCards
            showYup={true}
            showNope={true}
            smoothTransition={true}

            handleYup={handleYup}
            handleNope={handleNope}
        />
    );
};

export default CardSwiper;