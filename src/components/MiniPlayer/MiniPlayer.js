import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { togglePlay, setDuration } from '../../store/slices/playerSlice';
import styles from './MiniPlayer.style';
import { useNavigation } from '@react-navigation/native';

function MiniPlayer() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const videoRef = useRef(null);

    const {
        currentSong,
        isPlaying,
        seekTime,
        offlineSongs = {}
    } = useSelector((state) => state.player || {});

    useEffect(() => {
        if (videoRef.current && seekTime !== undefined && currentSong) {
            videoRef.current.seek(seekTime);
        }
    }, [seekTime]);

    if (!currentSong) return null;

    const getSource = () => {
        const offlineData = offlineSongs[currentSong.id];
        const path = typeof offlineData === 'object' ? offlineData.offlinePath : offlineData;
        if (path && typeof path === 'string') {
            return { uri: path };
        }
        return currentSong.preview ? { uri: currentSong.preview } : null;
    };

    const videoSource = getSource();

    const displayCover = currentSong.cover || currentSong.album?.cover_medium;
    const displayTitle = currentSong.title || "Bilinmeyen Şarkı";
    const displayArtist = currentSong.artist?.name || currentSong.artist || "Bilinmeyen Sanatçı";

    return (
        <View style={styles.container}>
            {videoSource && videoSource.uri && (
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
            )}

            <TouchableOpacity
                style={styles.content}
                onPress={() => navigation.navigate("Music Player")} 
            >
                <Image source={{ uri: displayCover }} style={styles.cover} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{displayTitle}</Text>
                    <Text style={styles.artist}>{displayArtist}</Text>
                </View>
                
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(togglePlay())} style={styles.playButton}>
                <Icon name={isPlaying ? "pause" : "play"} size={35} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default MiniPlayer;