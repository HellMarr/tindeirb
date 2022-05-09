import React, {useState,useEffect} from "react";
import reactDom from "react-dom";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Chat from "../components/CustomChat/Chat";
import CustomButton from '../components/CustomButton';
import CustomSettings from '../components/CustomSettings';
import client from "../app/api/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = ({navigation}) => {
    const [mydata,setmydata] = useState(null);
    const fetchData =  async () =>{
        console.log("let's fetch data for chat")
        let username = await AsyncStorage.getItem("username")
        const res = await client.post('/chat',{
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
        let myvar = await AsyncStorage.setItem("userchat",user)        
        console.log("go to chat") // Renvoie vers ChatUserScreen
        navigation.navigate("ChatUserScreen")
    }
    
    
    let chat=[]
    
    //Il faudrait que le text soit pressable et declanche OnUserPressed avec en arg obj.name
    if (mydata!=null){
        console.log(mydata)
        chat =mydata.map(obj =>
            <View key={obj.name}>
                <Chat 
                    image={obj.profile_img}
                    text={obj.description}
                    name={obj.name}
                    onpress={()=>OnUserPressed(obj.name)}
                />
            </View>
        );        
    }
    
   
    return (
        <View style={styles.container}>
            <View style={styles.root}>
            {chat}

            </View>
        </View>


        )
}

/*
const ChatScreen = ({navigation}) => {
    const username = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Text>Search Bar</Text>
            </View>

            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="elodie"
                />
            </View>
            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="emma"
                />
            </View>
            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="julie"
                />
            </View>
            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="julie"
                />
            </View>
            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="julie"
                />
            </View>
            <View style={styles.chat}>
                <Chat
                    image={'https://reactnative.dev/docs/assets/p_cat2.png'}
                    text="bjr"
                    name="julie"
                />
            </View>


        </View>
            
    )
}
*/


export default  ChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'lightgrey',
        top:50,
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
        width: 200,
        height: 1000,
    },


})