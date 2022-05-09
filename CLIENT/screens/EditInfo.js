import React, {useState} from 'react' ;
import { View, Image, StyleSheet, useWindowDimensions, Text,Picker} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomDate from '../components/CustomDate';
import CustomBack from '../components/CustomBack';




import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import RadioGroup from 'react-native-radio-buttons-group';


const logo =  require("../assets/images/logo_tinder.png")

import client from '../app/api/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);


const EditInfo = ({navigation}) => {
    const username = AsyncStorage.getItem("username")
    const [user_description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [user_date, setDate] = useState("");
    const [gender, setGender] = useState("");
    const [likedsex, setLikedsex] = useState("");
    const [user_age, setAge] = useState("");

    const {height} = useWindowDimensions();

    const userAuthenticated = async() =>{

        client.get("/isUserAuth", {
            headers: {
                "x-access-token": await AsyncStorage.getItem('token')
            },
        }).then((response)=>{
            console.log(response.data);
            if (response.data.error){
                return false
            } else{
                return true
            }
        });
        
    }

    const onEditPressed = async() => {
        if (userAuthenticated){
            const res = await client.post('/edit',{
                username,user_description,user_date,password,gender,likedsex,user_age
            })
            //console.warn(res.data)
            let errors = res.data.errors
            if (res.data.errors[1]){
                //Restez ici
                console.warn(res.data.errors)
            }
            else{
                console.log(res.data)
                navigation.navigate("Profile")
            }
        }
    }

    const onBackPressed = () => {
        navigation.navigate("Profile");
    }


    {/*
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Homme', value: 'homme'}, //Je touche pas mais dans la db, on met true pour femme et false pour homme 
        {label: 'Femme', value: 'femme'}
    ]);
    */}
    
    return (
        <View style={styles.root}>
            <AnimatedLinearGradient
                colors={["rgba(255, 101, 91, 1)", "rgba(254,60,114, 1)"]}
                style={styles.background}/>

            <Image 
                source={require('../assets/images/default.png')}
                style={[styles.image, {height : height*0.2}]} 
                resizeMode="contain"
            />

            <Text style={styles.text}>Changer les champs puis appuyez sur Mettre à jour </Text>
            
            {/*
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            */}
            <CustomBack
                onpress={onBackPressed}
                text="Back"
                type="primary"
            />
            
            <CustomInput 
                placeholder="Description                                             ( 140 char )" 
                multiline={true}
                line={3}
                length={50}
                value={user_description}
                setValue={setDescription}
                type={'default'}  
                input = {styles.description}  
            />
            
            <CustomInput 
                placeholder="Age                                                             ( 18-100 )" 
                length={2}
                type={'number-pad'}
                value={user_age}
                setValue={setAge}
                
                
            />

            {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
            
            {/*<CustomDate/>*/}

            <CustomInput   
                placeholder="Sexe                                 (Homme, Femme, Autre)" 
                auto={'gender'}
                value={gender}
                setValue={setGender}    
            />

            <CustomInput   
                placeholder="Profils recherchés" 
                auto={'gender'}
                value={likedsex}
                setValue={setLikedsex}    
            />

             <CustomButton 
                onpress={onEditPressed}
                text="Mettre à jour"
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
        height: 800,
    },

    image: {
        width:'85%',
        alignItems: 'center',
        top: -750,
        borderRadius:30
    },

    text: {
        width:'70%',
        top: -750,
        textAlign: 'center',
        color: 'white'
    },


    description : {
        height: 100,
        textAlignVertical: 'top'
        
    },



})

export default EditInfo

