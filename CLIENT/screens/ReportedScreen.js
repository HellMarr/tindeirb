import React, {useState,useEffect} from "react";
import reactDom from "react-dom";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Chat from "../components/CustomChat/Chat";
import CustomButton from '../components/CustomButton';
import CustomSettings from '../components/CustomSettings';
import client from "../app/api/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import LoadingScreen from "./LoadingScreen";

const ReportedScreen = ({navigation}) => {
    const [mydata,setmydata] = useState(null);
    const fetchData =  async () =>{
        console.log("let's fetch data for who reported")
        let username = await AsyncStorage.getItem("username")
        let user=await AsyncStorage.getItem("userreported")
        const mystring ='/report/'+user
        console.log(mystring)
        const res = await client.post('/report/'+user,{
            username
        })
        console.log(res.data.data)
        setmydata(res.data.data)
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

    const OnUserPressed = async(user) => {
        let myvar = await AsyncStorage.setItem("idreporter",user)        
        console.log("go to reported") // Renvoie vers ReportedScreen
        navigation.navigate("ChatreportedScreen")
    }

    const onBackPressed = async() => {
        console.log("retour vers AdminScreen")
        navigation.navigate("AdminScreen")

    }
    
    
    let chat=[]
    
    //Il faudrait que le text soit pressable et declanche OnUserPressed avec en arg obj.name
    if (mydata!=null && mydata != undefined){
        console.log(mydata)
        chat =mydata.map(obj =>
            <View key={obj} style={styles.discussion}>
                <Chat 
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text={obj}
                    name={obj}
                    onpress={()=>OnUserPressed(obj)}
                />
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
            <View style={styles.root}>
            <TouchableOpacity onPress={onBackPressed} style={styles.back}>
                <FontAwesomeIcon
                    icon={faLeftLong}
                    size={40}
                />
            </TouchableOpacity>
            {chat}

            </View>
        </View>


        )
    }
}

export default  ReportedScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'lightgrey',
        top:50,
    },

    back: {
        top : 15,
        left: -60,
        height: 40,
        backgroundColor: 'grey',
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
    },

    chat:{
        height:100,
        marginTop:2,
    },
    root : {
        alignItems: 'center',
        width: 200,
        height: 1000,
    },

    discussion:{
        top: 30,
    },


})