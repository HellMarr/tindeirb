import React, {useState} from 'react' ;
import { View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
const logo =  require("../assets/images/icon-tindeirb_blanc.png")

import AsyncStorage from '@react-native-async-storage/async-storage';

import client from '../app/api/client';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
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

    clearAsyncStorage = async() => {
        console.log("We clear the AsyncStorage here")
        AsyncStorage.clear();
      }
    

    const onSignUpPressed = async(values) => {
        clearAsyncStorage();
        const res = await client.post('/signup',{
            username,password,confirmpassword,email,age
        })
        console.warn(res.data)
        if (res.data.errors){
            //Restez ici
        }
        else{
            await AsyncStorage.setItem("token", res.data.token)
            await AsyncStorage.setItem("username", res.data.username)
            setLoginStatus(true)
            fetchData();
            navigation.navigate("Match")
        }
    }

    const onSignInPressed = () => {
        navigation.navigate("SignIn")      
    }

    const onForgotPressed = () => {
        console.warn('Mot de passe oublié')
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
        <CustomInput 
            placeholder="Username"
            value={username}
            setValue={setUsername}
        />
        <CustomInput 
            placeholder="E-mail" 
            value={email}
            setValue={setEmail}
        />
        <CustomInput 
            placeholder="Age"
            value={age}
            setValue={setAge}
        />
        <CustomInput   
            placeholder="Password" 
            value={password}
            setValue={setPassword}
            secureTextEntry={true}       
        />
        <CustomInput   
            placeholder="Confirm password" 
            value={confirmpassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
        />
        <CustomButton 
            onpress={onSignUpPressed}
            text="Inscription"
            type="primary"
        />
        <CustomButton 
            onpress={onSignInPressed}
            text="Se connecter"
            type="tertiary"
        />
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
        top: -800,
    },

    text: {
        width:'70%',
        top: -900,
        textAlign: 'center',
        color: 'white'
    }
})

export default SignUpScreen
