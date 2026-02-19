import React from "react"
import { View, Text } from "react-native";
import styles from "./CurrentSongInfo.style"
import { useSelector } from "react-redux";


// Şuan çalan şarkının üst kısmındaki bilgileri

function CurrentSongInfo() {
    const { currentSong } = useSelector((state) => state.player);

    return (
        <View style={styles.upper_container}>
            <Text style={styles.upper_text}>ŞU AN ÇALINIYOR</Text>
            <Text style={styles.upper_title}>{currentSong ? currentSong.title : "Şarkı Seçilmedi"}</Text>
        </View>
    );
}

export default CurrentSongInfo;