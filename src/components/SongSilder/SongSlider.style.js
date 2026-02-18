import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 25,
        marginTop: 20,
    },
    slider: {
        width: '100%',
        height: 40,
        marginLeft: -10,
        marginRight: -10,
    },
    time_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -8,
    },
    time_text: {
        color: 'white',
        fontSize: 12,
        opacity: 0.6,
        fontWeight: '500',
    },
});