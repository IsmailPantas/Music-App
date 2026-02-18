import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const imageSize = width - 70;

export default StyleSheet.create({


    song_cover: {
        height: imageSize,
        width: imageSize,
        margin: 10,
        borderRadius: 20,
    }
})