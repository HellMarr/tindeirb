import React from 'react' ;
import { View, Text,TextInput, StyleSheet, TouchableOpacity, Image, Button} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserPen,faRightFromBracket,faImage,faGavel, faCheckCircle,faBackward} from '@fortawesome/free-solid-svg-icons';

const CustomSettings= ({onpress,text,type,icon}) => {
    let iconfinal = faUserPen
    if (icon == "1"){
        iconfinal = faImage
    }else if (icon == "2"){
        iconfinal = faRightFromBracket
    }else if (icon == "3"){
        iconfinal = faUserPen
    }
    else if (icon == "4"){
        iconfinal = faGavel
    }
    else if (icon == "5"){
        iconfinal = faCheckCircle
    }
    else if (icon == "6"){
        iconfinal = faBackward
    }
    return (
            <TouchableOpacity onPress={onpress} style={[styles.container , styles[`container_${type}`]]}>
                <FontAwesomeIcon
                    style={styles.icon}
                    icon={iconfinal}
                    size={40}
                />
                <Text 
                    style={[styles.text, styles[`text_${type}`]]}>
                    {text}
                </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width:'100%',
        borderColor:"white",
        top: 670,
    },
    icon: {
        top:"20%",
        left:"20%",
    },

    container_primary:{
        backgroundColor:'lightgrey',
        borderRadius:100,
        width: 70,
        height: 70,
        marginLeft: 470,
    },

    container_secondary:{
        backgroundColor:'lightgrey',
        borderRadius:100,
        width: 70,
        height: 70,
        marginLeft: 590,
        top: 590,
    },

    container_tertiary: {
        backgroundColor:'lightgrey',
        borderRadius:100,
        width: 70,
        height: 70,
        marginLeft: 350,
        top: 520,
    },
    text_primary:  {
        fontWeight: 'bold',
        color: 'black',
        top: 30,
        marginLeft: 10,
        color: 'grey'
    },

    text_secondary: {
        fontWeight: 'bold',
        color: 'black',
        top: 30,
        marginLeft: 10,
        color: 'grey'
    },

    text_tertiary: {
        fontWeight: 'bold',
        color: 'black',
        top: 30,
        marginLeft: 10,
        color: 'grey'
    },

    image_style:{
        width: 75,
        height: 75,
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'#fff',
        borderRadius:100,
        //resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'lightgrey',
        top: -12.5,
        left: -12.5,
        margin: 10,
    },

    input: {},
})

export default CustomSettings