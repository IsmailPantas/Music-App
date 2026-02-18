import React from "react";
import {View, TextInput} from "react-native";
import styles from "./Input.style"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';





function Input ({placeholder, onChangeText, color = "#64748B", size = 20}) {
    return(
        <View style={styles.container}>
            <Icon style={styles.icon} name="magnify" color={color} size={size}/>
            <TextInput style= {styles.input_container} placeholder={placeholder} placeholderTextColor={"#64748B"} onChangeText={onChangeText}/>
        </View>
    )
}

export default Input;