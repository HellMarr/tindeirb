import React, {useState,useEffect} from 'react' ;
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MatchScreen from '../screens/MatchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const main = () =>  {
    const [isLoggedIn, setLogged] = useState(null);
    useEffect(async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
        setLogged(true);
        } else {
        setLogged(false);
        }
    }, [])
    return (
        
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                isLoggedIn == null ?
                    (<Stack.Screen name='Loading' component={LoadingScreen}></Stack.Screen>)
                    : isLoggedIn == true ?
                    (<Stack.Screen name='Match' component={MatchScreen}></Stack.Screen>)
                    :
                    (<>
                        <Stack.Screen name='SignUp' component={SignUpScreen}></Stack.Screen>
                        <Stack.Screen name='SignIn' component={SignInScreen}> </Stack.Screen>
                    </>
                    )
                }
            </Stack.Navigator>
    );
}



export default main;