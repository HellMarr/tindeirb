import React, {useState,useEffect} from 'react' ;
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tabs from './navigation/tabs';
import Main from './navigation/main';


function App() {
  return (
    
    <NavigationContainer>

      <Tabs/>
    </NavigationContainer>
    

  );
}

export default App;
