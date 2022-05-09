import React, { useEffect } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';
import { useState } from 'react/cjs/react.production.min';
//import AsyncStorage from '@react-native-community/async-storage';



const LoadingScreen = (props) => {
   /*useEffect(async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            props.navigation.navigate('Home');
        } else {
            props.navigation.navigate("Login");
        }
    }, [])*/
    return (
        
        <View style={styles.loading}>
            <ActivityIndicator size="large" color='blue'></ActivityIndicator>
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default LoadingScreen;