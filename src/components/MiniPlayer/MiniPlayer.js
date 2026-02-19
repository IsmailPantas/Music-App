import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { togglePlay, setDuration, playNextSong } from '../../store/slices/playerSlice';
import styles from './MiniPlayer.style';
import { useNavigation } from '@react-navigation/native';


// Alt kısımdaki Mini Oynatıcı

function MiniPlayer() {
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const navigation = useNavigation();

    const { 
        currentSong, 
        isPlaying, 
        seekTime, 
        isRepeat, 
        offlineSongs = {} 
    } = useSelector((state) => state.player || {});

    useEffect(() => {
        if (videoRef.current && seekTime !== undefined && currentSong) {
            videoRef.current.seek(seekTime); //
        }
    }, [seekTime, currentSong?.id]); //

    if (!currentSong) return null; //

    const source = (() => {
        const offlineData = offlineSongs[currentSong.id];
        const path = typeof offlineData === 'object' ? offlineData.offlinePath : offlineData;
        const uri = (path && typeof path === 'string') ? path : currentSong.preview;
        return uri ? { uri } : null;
    })();

    return (
        <View style={styles.container}>
            {source && (
                <Video
                    ref={videoRef}
                    source={source}
                    paused={!isPlaying}
                    repeat={isRepeat} //
                    style={{ width: 0, height: 0, position: 'absolute' }}
                    playInBackground={true}
                    onLoad={(data) => dispatch(setDuration(data.duration))}
                    onEnd={() => {
                        if (!isRepeat) {
                            dispatch(playNextSong()); //
                        }
                    }}
                    onError={(e) => console.log("Video Hatası:", e)}
                />
            )}

            <TouchableOpacity 
                style={styles.content} 
                onPress={() => navigation?.navigate("Music Player")}
            >
                <Image 
                    source={{ uri: currentSong.cover || currentSong.album?.cover_medium }} 
                    style={styles.cover} 
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {currentSong.title || "Yükleniyor..."}
                    </Text>
                    <Text style={styles.artist}>
                        {currentSong.artist?.name || currentSong.artist || "Bilinmeyen"}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => dispatch(togglePlay())} 
                style={styles.playButton}
            >
                <Icon name={isPlaying ? "pause" : "play"} size={35} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default MiniPlayer;