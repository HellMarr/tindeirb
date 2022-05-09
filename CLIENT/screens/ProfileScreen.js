import React, { useState, useEffect, Component } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Linking,Platform, RefreshControl,ScrollView} from 'react-native';
import CustomSettings from "../components/CustomSettings";
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../components/CustomButton';

import LoadingScreen from "./LoadingScreen";

import client from '../app/api/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const ProfileScreen = ({navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const username = AsyncStorage.getItem("username")
    const [image,setImage] = useState(null);
    const [data, setData] = useState(async () => {
    const data = await AsyncStorage.getItem('data') 
    setData(JSON.parse(data) || null)
    });

    const fetchData =  async () =>{
        console.log("let's fetch data profile")
        let username = await AsyncStorage.getItem("username")
        const res = await client.post('/profileInfo',{
            username
        })
        setData(res.data.data)
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
    

    const onSelectImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64:true,
            allowsEditing:true,
            aspect: [9,16],
            quality:1
        })
        console.log(result)
        if (!result.cancelled){
            setImage(result.uri) 
            AsyncStorage.setItem("image",result.uri)
            const img_url = result.uri
            const data = new FormData();
            data.append('name', 'avatar');
            data.append('fileData', {
                uri : result.uri,
                type: result.type,
                name: result.fileName,
                buffer:result.base64
            });
            const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
            };
            const res = await client.post('/uploadImage?username='+ username ,config)
              
        }
    }

    const onEditInfoPressed = () => {
        navigation.navigate("EditInfo")
    }

    clearAsyncStorage = async() => {
        console.log("We clear the AsyncStorage here")
        AsyncStorage.clear();
    }

    const onSignOutPressed = async() => {
        const res = await client.post('/signout',{
            username
        })
        console.log(res.data)
        await clearAsyncStorage()
        navigation.navigate("SignIn")
    }
    if (data == null){
        return (
            <LoadingScreen/>
        )
    }
    else {
        return (
            <View>
                <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        }
                    >
                    <Text>Pull down to see RefreshControl indicator</Text>
                </ScrollView>
                <View style={styles.container}>
                    {image == null && (
                    <Image
                        source={require('../assets/images/default.png')}
                        style={styles.image_style}
                    />
                    )}
                    {image != null && (
                    <Image
                        source={{uri:image}}
                        style={styles.image_style}
                    />
                    )}
                    <Text style={styles.name_style}>{data.user_name}, {data.user_age}</Text>
                    <Text style={styles.bio_style}>{data.user_description}</Text>
                    <CustomSettings  
                        onpress={onSelectImage}
                        icon="1"
                        text="Change picture"
                        type="primary"
                    />

                    <CustomSettings  
                        onpress={onSignOutPressed}
                        icon="2"
                        text="Log Out"
                        type="secondary"
                    />

                    <CustomSettings  
                        onpress={onEditInfoPressed}
                        icon="faLock"
                        text="Edit info"
                        type="tertiary"
                    />

                    <Text style={styles.GetMatches}>Get Matches Faster</Text>
                    <Text style={styles.GetMatchesBis}>Boost your profile once a week!</Text>

                    <TouchableOpacity onPress={() => Linking.openURL('https://tinder.com/fr/feature/plus')}>
                        <Text style={styles.TinderPlus}>GET TINDER PLUS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default  ProfileScreen

const styles = StyleSheet.create({
    disconnect: {
        top: 700,
        alignSelf: 'center',
        width: 200,
        height: 50,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
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
        top: -570,
        
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