import React, {useState,useEffect} from "react";
import reactDom from "react-dom";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Chat from "../components/CustomChat/Chat";
import CustomButton from '../components/CustomButton';
import CustomSettings from '../components/CustomSettings';
import { faLeftLong, faGavel, faCheckCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import client from "../app/api/client";
import CustomInput from '../components/CustomInput';
import CustomMessageInput from '../components/CustomMessageInput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { faYoast } from "@fortawesome/free-brands-svg-icons";

//import { io } from "socket.io-client";
//import { set } from "mongoose";


const ChatUserScreen = ({navigation}) => {
    const [mydata,setdata] = useState(null);
    const [content, setcontent] =useState("");
    const [user,setuser]=useState(null);
    const[myusername, setusername]=useState(null);
    const fetchData =  async () =>{
        console.log("let's fetch data for chat")
        let usertemp = await AsyncStorage.getItem("userchat")
        
        
        let username= await AsyncStorage.getItem("username")
        setusername(username)
        console.log(username +" discute avec " +usertemp)
        const res = await client.post('/chat/'+usertemp,{
            username
        })
        setdata(res.data.data)
        setuser(usertemp)
        
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

    const onBackPressed = async() => {
        console.log("retour")
        navigation.navigate("ChatScreen")

    }

    const onSendPressed = async() => {
        console.log(myusername+" send: "+content+" to "+user)
        const res= await client.post("/chatsend/"+user,{
            myusername,content
        })
        console.log(res.data.msg)
    }
    /*
    const SendMsg = async(content) => {
         //let user = await AsyncStorage.getItem("userchat")
        let user="Martin";
        let username= await AsyncStorage.getItem("username");
        const res = await client.post('/chatsend/'+user,{
            username,content
        })
        console.log("msg sent")
    }*/
    
    //let msgtemp=[]
    //const socket = io('http://192.168.1.92:3001');
    
    /*io.on("connection", (socket) => {
        console.log("coucou1")
        // receive a message from the server
        nb=0;
        if (mydata!=null){
            nb=mydata.length+msgtemp.length;// On genere la cle
        }
        console.log("coucou3")
        socket.on(myusername, sender => {
          chat.push({
              data_msg:content,
              data_sender: sender,
              nmsg: nb
          })
        });
      });*/

    let chat=[]
    
    if (mydata!=null){
        //console.log(mydata)
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
        //console.log(chat)
    }
    /*let chatemp=[]
    
    if (msgtemp!=null){
        chat = msgtemp.map(obj =>
      <Text
            key={obj.nbmsg}>
                {obj.data_msg}
                {obj.data_sender}
            </Text>
        );
        //console.log(chat)
    }*/
   
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Messagerie</Text>
            <TouchableOpacity onPress={onBackPressed} style={styles.back}>
                <FontAwesomeIcon
                    icon={faLeftLong}
                    size={40}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSendPressed} style={styles.send}>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    size={30}
                />
            </TouchableOpacity>
            <View style={styles.root}>
            {chat}
            </View>
            <View>
                <CustomMessageInput 
                    placeholder="   Ecrire..." 
                    multiline={true}
                    line={3}
                    length={50}
                    type={'default'}  
                    input = {styles.description}
                    value={content}
                    setValue={setcontent}
                />
            </View>
            {/* <View>
                <CustomSettings  
                    onpress={onSendPressed}
                    icon="5"
                    text="Envoyer"
                    type="tertiary"
                    />
            </View>
            <View>
            <CustomSettings  
                onpress={onBackPressed}
                icon="5"
                text="Retour"
                type="tertiary"
            />
            </View> */}
        </View>
        )
}



export default  ChatUserScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
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

    send:{
        top: 625,
        left: 335,
        zIndex: 1,
    },

    titre: {
        position: 'absolute',
        fontSize: 30,
        left: 120,
        top: 15,
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
    cont : {
        backgroundColor:'white',
        height:40,
        width:400,
        marginLeft:10,
        marginTop:10
    
    },
    mess :{
        borderRadius:10,
        marginLeft: 15,
        backgroundColor:'cornflowerblue',
        width: 350,
    },
    text : {
        marginLeft : 10,
    },

    description : {
        height: 80,
        width:300,
        marginTop:15,
        textAlignVertical: 'top',
        backgroundColor:'lightgrey',
        borderRadius: 10,
    },
    
    
})