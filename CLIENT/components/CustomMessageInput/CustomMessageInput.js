import React from 'react' ;
import { View, Text,TextInput, StyleSheet} from 'react-native';


const CustomInput = ({value, setValue, placeholder,secureTextEntry,input,type,length,auto,multiline,line}) => {
    return (

        <View style={styles.container}>
            <TextInput 
                value={value}         
                multiline={multiline}
                numberOfLines={line}     
                autoComplete={auto}
                maxLength={length}
                onChangeText={setValue}
                placeholder={placeholder}
                style={input}
                secureTextEntry={secureTextEntry}
                keyboardType={type}
                blurOnSubmit={true}  
                />
                
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        borderWidth: 2,
        borderColor: 'grey',
        height: 105,
        width:'100%',
        borderColor:"#e8e8e8",
        borderRadius:0,
        paddingHorizontal: 10,
        marginBottom: 0,
        top: -445,
    },
    //input: {},
    
})

export default CustomInput