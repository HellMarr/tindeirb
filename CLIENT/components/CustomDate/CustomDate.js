import React, {useState} from 'react' ;
import { View, Text, Button, StyleSheet,Image} from 'react-native';
import DatePicker from 'react-native-date-picker';

const CustomDate = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    )
}


const styles = StyleSheet.create({
    
})

export default CustomDate