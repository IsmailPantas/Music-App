import React from "react";
import {View, StyleSheet, Text} from "react-native";
import LottieView from "lottie-react-native";

function Loading() {
    return(
        <View style={styles.container}>

            <LottieView source={require("../../assets/Loading.json")} autoPlay style={{ width: 300, height: 300 }}/>
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