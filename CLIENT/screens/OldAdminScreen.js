import React, {useState} from 'react' ;
import { View, Image, StyleSheet, useWindowDimensions, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomSettings from '../components/CustomSettings';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
const logo =  require("../assets/images/logo_tinder.png")

import AsyncStorage from '@react-native-async-storage/async-storage';

import client from '../app/api/client';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const OldAdminScreen = ({navigation}) => {
    const [username, setUsername] = useState(null);
    const fetchBans =  async () =>{
        console.log("let's fetch The banned accounts")
        let username = await AsyncStorage.getItem("username")
        setUsername(username)
        const res = await client.post('/banInfo',{
            username
        })
        setBanArray(res.data.reported)
        setCurrentBan(res.data.reported[0])
        console.log(res.data.reported)
        return res.data.reported
    }
    const [currentBan,setCurrentBan] = useState(null)
    const [banarray, setBanArray] = useState(async () => {
        const banarray = fetchBans()
    });
    
    const {height} = useWindowDimensions();

    //const listreported= await client.get('/report');
    const onBanPressed = async(user) => {
        console.warn('Utilisateur banni')
        const res = await client.post('/ban',{
            currentBan
        })
        console.log(res.data.message)
    }

    const onAcquitPressed = async(user) => {
        console.log("au suivant")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name_style}>{currentBan}</Text>
            <Text style={styles.bio_style}>raison : {currentBan}</Text>
            <CustomSettings  
                onpress={onBanPressed}
                icon="4"
                text="Bannir"
                type="secondary"
            />
            <CustomSettings  
                onpress={onAcquitPressed}
                icon="5"
                text="Acquitter"
                type="tertiary"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    disconnect: {
        top: 700,
        alignSelf: 'center',
        width: 200,
        height: 50,
    },
    discoButton: {
        borderRadius: 10000,
        backgroundColor: 'white',
    },

    container:{
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 1000,
        width: 1000,
        borderRadius: 3000,
        top: -370,
        
    },

    image_style:{
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 100,
        top: 640,
    },

    name_style:{
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        top: 640,
    },

    bio_style:{
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        top: 640,
    },

    GetMatches: {
        fontSize: 25,
        color: 'black',
        alignSelf: 'center',
        top: 620,
    },

    GetMatchesBis:{
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        top: 620,
    },

    TinderPlus:{
        fontSize: 20,
        top: 650,
        backgroundColor: 'white',
        color: 'red',
        textShadowRadius: 10,
        textShadowColor: 'pink',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 20,
        width: 230,
        height: 50,
        borderWidth: 3,
        borderColor: 'lightgrey',
    }
})

export default OldAdminScreen
