import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { togglePlay, setDuration, saveOfflinePath } from '../../store/slices/playerSlice';
import styles from './MiniPlayer.style';
import { useNavigation } from '@react-navigation/native';
import offlineService from "../../services/offlineService";

function MiniPlayer() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const videoRef = useRef(null);

    // State yapısı
    const {
        currentSong,
        isPlaying,
        seekTime,
        offlineSongs = {}
    } = useSelector((state) => state.player || {});

    // Hafızayı terminalde görüntüle
    useEffect(() => {
        if (Object.keys(offlineSongs).length > 0) {
            console.log("OFFLINE HAFIZA:", JSON.stringify(offlineSongs, null, 2));
        }
    }, [offlineSongs]);

    // Offline kontroller
    useEffect(() => {
        const handleOffline = async () => {
            if (currentSong?.id && !offlineSongs[currentSong.id]) {
                const localPath = await offlineService.downloadSong(currentSong);
                if (localPath) {
                    dispatch(saveOfflinePath({ id: currentSong.id, path: localPath }));
                }
            }
        };
        handleOffline();
    }, [currentSong?.id]);

    // Seek
    useEffect(() => {
        if (videoRef.current && seekTime !== undefined && currentSong) {
            videoRef.current.seek(seekTime);
        }
    }, [seekTime]);


    if (!currentSong) return null;


    const videoSource = offlineSongs[currentSong.id]
        ? { uri: offlineSongs[currentSong.id] }
        : { uri: currentSong.preview };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={videoSource}
                paused={!isPlaying}
                repeat={true}
                style={{ width: 0, height: 0, position: 'absolute' }}
                playInBackground={true}
                audioOnly={true}
                onLoad={(data) => dispatch(setDuration(data.duration))}
                onError={(error) => console.log("Video Hatası:", error)}
            />

            <TouchableOpacity
                style={styles.content}
                onPress={() => navigation.navigate("Music Player")}
            >
                <Image source={{ uri: currentSong.cover }} style={styles.cover} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
                    <Text style={styles.artist}>{currentSong.artist}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(togglePlay())} style={styles.playButton}>
                <Icon name={isPlaying ? "pause" : "play"} size={35} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default MiniPlayer;