import React from "react";
import { View, TextInput } from "react-native";
import styles from "./Input.style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// Tüm sayfalar için ortak arama barı

function Input({ placeholder, onChangeText, color = "#64748B", size = 20, ...rest }) {
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="magnify" color={color} size={size}/>
            <TextInput 
                style={styles.input_container} 
                placeholder={placeholder} 
                placeholderTextColor={"#64748B"} 
                onChangeText={onChangeText}
                returnKeyType="search"
                {...rest}
            />
        </View>
    );
}

export default Input;