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

const AdminScreen = ({navigation}) => {
    const [mydata,setmydata] = useState(null);
    const fetchData =  async () =>{
        console.log("let's fetch data for reported")
        let username = await AsyncStorage.getItem("username")
        const res = await client.post('/report',{
            username
        })
        
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
        let myvar = await AsyncStorage.setItem("userreported",user)        
        console.log("go to reported") // Renvoie vers ReportedScreen
        navigation.navigate("ReportedScreen")
    }

    const onBackPressed = async() => {
        console.log("retour vers Match")
        navigation.navigate("Match")
    }
    
    
    let chat=[]
    
    //Il faudrait que le text soit pressable et declanche OnUserPressed avec en arg obj.name
    if (mydata!=null && mydata != undefined){
        console.log(mydata)
        chat =mydata.map(obj =>
            <View key={obj.name}>
                <Chat 
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text={obj.decription}
                    name={obj.name}
                    onpress={()=>OnUserPressed(obj.name)}
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
            <TouchableOpacity onPress={onBackPressed} style={styles.back}>
                <FontAwesomeIcon
                    icon={faLeftLong}
                    size={40}
                />
            </TouchableOpacity>
            <Text style={styles.admin}> Admin screen</Text>
            <View style={styles.root}>
            {chat}
            
            
            </View>
        </View>


        )
    }
}

export default  AdminScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'lightgrey',
        top:50,
    },

    back: {
        top : 15,
        left: 10,
        height: 40,
        backgroundColor: 'grey',
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
    },

    admin: {
        top : -22,
        height: 60,
        fontSize: 25,
        width: 350,
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center',
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
        top: -30,
        width: 200,
        height: 1000,
    },
    button : {
        width:20,
        height:20,
        top:'50%',
        right: '10%',
      }


})