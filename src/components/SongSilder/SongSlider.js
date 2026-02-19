import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { setSeekTime } from '../../store/slices/playerSlice';
import styles from "./SongSlider.style";

function SongSlider() {
    const dispatch = useDispatch(); 
    const { currentSong, isPlaying, duration, seekTime } = useSelector((state) => state.player);
    
    const [currentTime, setCurrentTime] = useState(seekTime || 0);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        if (!isSliding) {
            setCurrentTime(seekTime);
        }
    }, [seekTime]);

    useEffect(() => {
        let interval;
        if (isPlaying && currentSong && !isSliding) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev < (duration || 30)) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSong, duration, isSliding]);

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (!currentSong) return null;

    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration || 30} 
                value={currentTime}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
                thumbTintColor="#FFFFFF"
                onValueChange={(value) => {
                    setIsSliding(true);
                    setCurrentTime(value);
                }}
                onSlidingComplete={(value) => {
                    setIsSliding(false);
                    dispatch(setSeekTime(value));
                }}
            />
            <View style={styles.time_container}>
                <Text style={styles.time_text}>{formatTime(currentTime)}</Text>
                <Text style={styles.time_text}>{formatTime(duration || 30)}</Text>
            </View>
        </View>
    );
}

export default SongSlider;