import React, {useState} from 'react' ;
import { View, Image, StyleSheet, useWindowDimensions, Text, LocalStorage } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";


const logo =  require("../assets/images/icon-tindeirb_blanc.png")

import client from '../app/api/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    const {height} = useWindowDimensions();

    const fetchData =  async () =>{
        console.log("let's fetch data")
        let username = await AsyncStorage.getItem("username")
        const res = await client.post('/profileInfo',{
            username
        })
        await AsyncStorage.setItem("data", JSON.stringify(res.data.data))
    }

    const onSignInPressed = async() => {
        const res = await client.post('/signin',{
            username,password
        })
        console.log(res.data)
        if (res.data.errors){
            //Restez ici
        }
        else{
            setLoginStatus(true);
            await AsyncStorage.setItem("token", res.data.token)
            await AsyncStorage.setItem("username", res.data.username)
            fetchData();
            navigation.navigate("Match")
        }
    }

    const onSignUpPressed = () => {
        navigation.navigate("SignUp")
    }

    const userAuthenticated = async(res) =>{

        client.get("/isUserAuth", {
            headers: {
                "x-access-token": await AsyncStorage.getItem('token')
            },
        }).then((response)=>{
            console.log(response.data);
            res = response.data
        });
        if (res.error){
            return false
        } else{
            return true
        }
    }


    return (
        <View style={styles.root}>
            <AnimatedLinearGradient
                colors={["rgba(255, 101, 91, 1)", "rgba(254,60,114, 1)"]}
                style={styles.background}/>
            <Image 
                source={logo} 
                style={[styles.logo, {height : height*0.2}]} 
                resizeMode="contain"
            />
            <Text style={styles.text}>En appuyant sur Créer un compte ou sur Connexion, tu acceptes nos Conditions d'utilisation. Pour en savoir plus sur l'utilisation de tes données, consulte notre Politique de confidentialité et notre Politique en matière de cookies.</Text>
            <CustomInput 
                placeholder="Username" 
                value={username}
                setValue={setUsername}
            />
            <CustomInput   
                placeholder="Password" 
                value={password}
                setValue={setPassword}
                secureTextEntry={true}       
            />
            <CustomButton 
                onpress={onSignInPressed}
                text="Connexion"
                type="primary"
            />
             <CustomButton 
                onpress={onSignUpPressed}
                text="S'inscrire"
                type="tertiary"
            />
            {!AsyncStorage.getItem('token') && (
                <CustomButton 
                onpress={userAuthenticated}
                text="S'inscrire"
                type="tertiary"
            />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    root : {
        alignItems: 'center',
        width: 400,
        height: 1000,
    },

    background: {
        alignItems: 'center',
        width: 500,
        height: 1000,
    },

    logo: {
        width:'85%',
        alignItems: 'center',
        top: -750,
    },

    text: {
        width:'70%',
        top: -750,
        textAlign: 'center',
        color: 'white'
    }
})

export default SignInScreen

