import React, {useState,useEffect} from "react";
import reactDom from "react-dom";
import { View, Text, Button, StyleSheet,Image, TouchableOpacity} from 'react-native';
import Chat from "../components/CustomChat/Chat";
import CustomButton from '../components/CustomButton';
import CustomSettings from '../components/CustomSettings';
import client from "../app/api/client";

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { faLeftLong, faGavel, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import LoadingScreen from "./LoadingScreen";

import { io } from "socket.io-client";


const ChatreportedScreen = ({navigation}) => {
    const [mydata,setdata] = useState(null);
    const[myusername, setusername]=useState(null);
    const fetchData =  async () =>{
        console.log("let's fetch data for chat")
        let user = await AsyncStorage.getItem("userreported")
        let username= await AsyncStorage.getItem("username")
        let id_reporter = await AsyncStorage.getItem("idreporter")
        setusername(username)
        console.log(username +" discute avec " +user)
        const res = await client.post('/reportchat/'+user,{
            username,id_reporter
        })
        setdata(res.data.data)
        
    }

    useEffect( async () =>{
        if (Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted'){
                alert('Permission denied!')
            }
        }
        fetchData()
    }, [])

    const onBanPressed = async() => {
        console.warn('Utilisateur banni')
        let user = await AsyncStorage.getItem("userreported")
        let username= await AsyncStorage.getItem("username")
        console.log(username+" ban "+ user)
        const res = await client.post('/ban/'+user,{
            username
        })
        navigation.navigate("AdminScreen")
        
    }

    const onAcquitPressed = async() => {
        console.log("au suivant")
        let user = await AsyncStorage.getItem("userreported")
        let username= await AsyncStorage.getItem("username")
        const res = await client.post('/forgive/'+user,{
            username
        })
        navigation.navigate("Match")

    }
    const onBackPressed = async() => {
        console.log("retour")
        navigation.navigate("Match")

    }

    
    let chat=[]
    
    if (mydata!=null && mydata != undefined){
        
        chat = mydata.map(obj =>
            <View style={styles.cont} key={obj.nmsg}>
            <View style={styles.mess}>
                <Text style={styles.text}>
                    {obj.data_sender} 
                </Text>
                <Text style={styles.text}>
                    {obj.data_msg}
                </Text>
            </View>
        </View>
        );
        
    }
    
    if (mydata == null){
        return (
            <LoadingScreen></LoadingScreen>
        )
    } 
    else {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBackPressed} style={styles.back}>
                <FontAwesomeIcon
                    icon={faLeftLong}
                    size={40}
                />
            </TouchableOpacity>
            <Text style={styles.msg}>Voulez vous reporter l'utilisateur à l'origine du message suivant:</Text>
            <View style={styles.design}>{chat}</View>
            <TouchableOpacity onPress={onBanPressed} style={styles.ban}>
                <FontAwesomeIcon
                    icon={faGavel}
                    size={40}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onAcquitPressed} style={styles.acquit}>
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={40}
                />
            </TouchableOpacity>
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
}



export default  ChatreportedScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'lightgrey',
        top:50,
        height: 800,
    },
    chat:{
        height:100,
        marginTop:2,
    },

    search:{
        height:30,
        backgroundColor:'grey',
        marginLeft:15,
        marginRight:250,
    },
    root : {
        alignItems: 'center',
        width: 400,
        height: 1000,
    },

    ban: {
        top : 120,
        left: 130,
    },

    acquit:{
        top : 80,
        left: 220,
        width: 60,
        height: 60,
        alignItems: 'center',
        borderRadius: 200,
    },

    back: {
        top : 20,
        left: 10,
        height: 40,
        backgroundColor: 'grey',
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
    },

    msg: {
        top : 40,
        height: 60,
        fontSize: 20,
        backgroundColor: 'pink',
        borderWidth: 2,
        borderColor: 'red',
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
    },

    design: {
        top : 70,
        marginTop: 10,
        height: 400,
        borderWidth: 2,
        alignSelf: 'center',
        borderColor: 'grey',
        width: 350,
        borderRadius: 10,
        zIndex: 2,
        alignItems: 'center',
        textAlignVertical: 'center',
    }
})