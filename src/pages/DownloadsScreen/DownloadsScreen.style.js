import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1, // ✅ Ekranın tamamını kaplaması için şart
        backgroundColor: '#0A0F1A', // Spotify koyu teması
    },
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    offline_badge: {
        backgroundColor: '#1DB954',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    offline_text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
    },
    card_wrapper: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list_content: {
        paddingBottom: 120,
    },
    empty_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    empty_text: {
        color: '#b3b3b3',
        fontSize: 16,
        textAlign: 'center',
    }
});