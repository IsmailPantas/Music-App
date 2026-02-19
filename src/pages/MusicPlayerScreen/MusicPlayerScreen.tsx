import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import styles from "./MusicPlayerScreen.style"
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import MainMusicCard from "../../components/MainMusicCard";
import CurrentSongInfo from "../../components/CurrentSongInfo";
import CurrentSongTitle from "../../components/CurrentSongTitle"
import SongSlider from "../../components/SongSilder";
import MusicControllers from "../../components/MusicControllers"

// Müzik oynatıcısı

function MusicPlayerScreen() {
    const MAIN_BLACK = '#0A0F1A';
    const [dominantColor, setDominantColor] = useState('#817cc5');

    const { currentSong } = useSelector((state:any) => state.player);

    return (
        <LinearGradient
            colors={[dominantColor, MAIN_BLACK]}
            locations={[0, 0.4]}
            style={styles.backgroundGradient}
        >
            <SafeAreaView style={styles.container}>
                {!currentSong ? (
                    <View style={styles.not_play}>
                        <Text style={styles.not_play_title}>Henüz Bir Şarkı Oynatılmıyor</Text>
                    </View>
                ) : (
                    <>
                        <CurrentSongInfo />
                        <View>
                            <MainMusicCard />
                        </View>
                        <CurrentSongTitle/>
                        <SongSlider/>
                        <MusicControllers/>
                    </>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

export default MusicPlayerScreen;