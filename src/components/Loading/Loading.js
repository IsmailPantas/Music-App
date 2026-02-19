import React from "react";
import {View, StyleSheet, Text} from "react-native";
import LottieView from "lottie-react-native";




// Loading animasyonu

function Loading() {
    return(
        <View style={styles.container}>

            <LottieView source={require("../../assets/Loading.json")} autoPlay style={{ width: 100, height: 100 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Loading;