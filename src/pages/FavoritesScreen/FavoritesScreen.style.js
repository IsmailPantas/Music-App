import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0F1A',
    },
    header_container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
    },
    header_title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    empty_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty_text: {
        color: '#64748B',
        fontSize: 16,
    },
    input_container: {
        marginTop: 10,
    }
});