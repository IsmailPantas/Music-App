import { StyleSheet } from "react-native";


export default StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 20,
        width: '100%',
    },
    text_container: {
        flex: 1,
        alignItems: 'flex-start'
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    artist: {
        color: "white",
        opacity: 0.8,
        fontSize: 20,
    }
})