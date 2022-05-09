import React from 'react' ;
import { View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import SwipeCards from 'react-native-swipe-cards';

import { pets as petsObj } from '../../data/data';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const img = require('../../assets/images/pet1.jpg')

const Card = ({user_description, user_name, user_age, user_profile_img}) => {

    return (
        <View style={styles.container}>
            <AnimatedLinearGradient colors={["transparent", "rgba(0,0,0, 1)"]} style={styles.background}/>
                <Image source={{ uri: user_profile_img }} style={styles.image_style}/>
                <View style={styles.name_container}>
                    <Text style={styles.name_style}>{user_name} {user_age}</Text>
                    <Text style={styles.bio}>{user_description}</Text>
            </View>
        </View>   
    )
}
 
const styles = StyleSheet.create({
    container: {
        top: 210,
        right: -70,
        height: 500,
        width:300,
    },

    background: {
        top: 375,
        left: -40,
        alignItems: 'center',
        width: 380,
        height: 250,
        borderRadius: 20,
        zIndex: 1,
    },

    image_style:{
        //position: 'absolute',
        top: -240,
        left: 0,
        alignSelf: 'center',
        width: 380,
        height: 615,
        borderRadius: 20,
    },

    name_container:{
        //position: 'absolute',
        width: 400,
        top: -440,
        left: -10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    name_style:{
        alignSelf: 'flex-start',
        top: 0,
        left: 0,
        fontSize: 45,
        color: 'white',
    },

    bio:{
        alignSelf: 'flex-start',
        fontSize: 20,
        color: 'white',    
    },
    input: {},
})

export default Card