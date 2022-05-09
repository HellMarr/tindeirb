import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';




const CustomButton = ({onpress,text,type}) => {
    return (
        <TouchableOpacity onPress={onpress} style={[styles.container , styles[`container_${type}`],styles.container_PRIMARY]}>
            <Text 
                style={[styles.text, styles[`text_${type}`]]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({

    container: {
        
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_primary:{
        backgroundColor:'white',
        top: -700,
        width: '85%',
        borderRadius: 50,
    },
    container_tertiary: {
        top: -700,
        width: '85%',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },

    container_deconnection: {
        alignSelf: 'center',
        top: 700,
        height: 55,
        backgroundColor : 'rgba(254,60,114, 1)',
        width: 200,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },

    text_primary:  {
        fontWeight: 'bold',
        color: 'grey',
    },
    text_tertiary: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_deconnection: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
    },

});

export default CustomButton