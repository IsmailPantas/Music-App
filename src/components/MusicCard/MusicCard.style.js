import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        backgroundColor: "#0A0F1A",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#161A24",

    },
    song_cover: {
        width: 55,
        height: 55,
        borderRadius: 10,
        overflow: "hidden",
        resizeMode: "contain",
    },
    inner_container: {
        paddingLeft: 15,
        justifyContent: "center",
        flexShrink: 1,
        flex: 1,
    },
    main_title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 2,
    },
    artist_title: {
        color: "#CBD5E1",
        fontSize: 10,
    },
    album_title: {
        color: "#94A3B8",
        fontSize: 9,
    },
    favorites: {
        textAlign: "left",
        alignSelf: "flex-start",
        padding: 5,
    }
});