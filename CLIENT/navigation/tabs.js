import React, {useState,useEffect} from 'react' ;
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EditInfoScreen from '../screens/EditInfo';
import AdminScreen from '../screens/AdminScreen';
import ChatUserScreen from '../screens/ChatUserScreen'
import ChatreportedScreen from '../screens/ChatreportedScreen';
import ReportedScreen from '../screens/ReportedScreen';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser,faComment,faGavel } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

import client from '../app/api/client';

import LoadingScreen from '../screens/LoadingScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Tabs = () =>  {
    const [routeInit, setRouteInit] = useState(null);
    const [isAdmin, setAdmin] = useState(async () => {
        const isAdmin = await AsyncStorage.getItem('isAdmin') 
        setAdmin(isAdmin || null)
        });
    const userAuthenticated = async() =>{
        console.log("on teste l'authentification ...")
        client.get("/isUserAuth", {
            headers: {
                "x-access-token": await AsyncStorage.getItem('token')
            },
        }).then((response)=>{
            if ((response.data.auth)){
                setRouteInit("Match")
            }
            else {
                setRouteInit("SignIn")
            }
        });
    }
    useEffect( async () =>{
        userAuthenticated();
    }, [])
    if (routeInit == null){
        return (
            <LoadingScreen/>
        )
    }else{
        return(
            <Tab.Navigator
                screenOptions={{
                    showLabel:false,
                    style:{
                        position : 'absolute',
                        bottom: 25,
                        left: 20,
                        right:20,
                        elevation:0,
                        backgroundColor: '#e8e8e8',
                        borderRadius: 15,
                        height: 90,
                        ... styles.shadow
                        }
        }}

        initialRouteName= {routeInit}
        >
                <Tab.Screen name="ChatScreen" component={ChatScreen} 
                options={{
                    header: () => null,
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                            <FontAwesomeIcon 
                                icon={faComment} 
                                size={25}
                                color={"green"}
                            />
                        </View>
                    ),
                }}/>
                
                {isAdmin == 'true' && (
                     <Tab.Screen name="AdminScreen" component={AdminScreen}
                     options={{
                         header: () => null,
                         tabBarIcon:({focused})=>(
                             <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                                 <FontAwesomeIcon 
                                     icon={faGavel} 
                                     size={25}
                                     color={"black"}
                                 />
                             </View>
                         ),
                     }}/>
                )}
                
                <Tab.Screen name="Match" component={MatchScreen}
                options={{
                    header: () => null,
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>
                <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    header: () => null,
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                            <FontAwesomeIcon 
                                icon={faUser} 
                                size={25}
                                color={"blue"}
                            />
                        </View>
                    ),
                }}/>
                <Tab.Screen name="SignIn" component={SignInScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    ////////
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0, }}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>
               
                <Tab.Screen name="EditInfo" component={EditInfoScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    ////////
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0, }}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>

                <Tab.Screen name="ChatUserScreen" component={ChatUserScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    ////////
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0, }}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>



                <Tab.Screen name="SignUp" component={SignUpScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0}}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>
                

                 <Tab.Screen name="ChatreportedScreen" component={ChatreportedScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    ////////
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0, }}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>



                <Tab.Screen name="ReportedScreen" component={ReportedScreen}
                options={{
                    header: () => null,
                    tabBarButton: () => null,
                    ////////
                    tabBarStyle: { display: "none" },
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:0, }}>
                            <Image
                            source={require('../assets/images/path125.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : "#748c94"
                            }}
                            />
                        </View>
                    ),
                }}/>

            </Tab.Navigator>
        );
    }
}

export default Tabs;

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#d78498',
        shadowOffset:{
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
})

/*<Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarIcon:({focused})=>(
                        <Image
                        source={require('../assets/images/path125.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#e32f45' : "#748c94"
                        }}
                        />

                ),
                tabBarButton:(props)=>(
                    <CustomTabBarButton {...props}/>
                )
            }}/>*/

