import React from "react";
import { View, Text, Button, StyleSheet,Image,TouchableOpacity} from 'react-native';

const Chat = ({image,name,text,onpress}) => {
    return (
        <TouchableOpacity onPress={onpress} >
            <View style={styles.col}>
                <View style={styles.message}>
                    <Image
                        source={{uri: image}}
                        style={styles.image_style}
                    />
                    <Text style={styles.name_style}>{name}</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    col:{
        flexDirection: "column",
        height: 100,
        padding: 0,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },

    message:{
        backgroundColor: 'white',
        height: 100,
        width:450,
        marginLeft:250,        
    },

    image_style:{
        width: 60,
        height: 60,
        borderRadius: 100,
        top: 10,
        marginLeft:10,
    },


    name_style:{
        marginLeft:90,
        marginTop:-45,
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white'
    },
    text:{
        marginLeft:90,
        marginTop:10,
        fontSize: 10,
        color: 'black',
        backgroundColor: 'white'
    }
    
})

export default Chat