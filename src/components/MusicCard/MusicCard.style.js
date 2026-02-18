import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#0A0F1A',
        alignItems: 'center',
        borderColor: "#171B25",
        borderRadius: 8,
        borderBottomWidth: 1,
    },
    song_cover: {
        width: 60,
        height: 60,
        borderRadius: 4
    },
    inner_container: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'center'
    },
    main_title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    artist_title: {
        color: '#b3b3b3',
        fontSize: 14,
        marginTop: 2
    },
    action_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    download_btn: {
        marginRight: 15
    }
});