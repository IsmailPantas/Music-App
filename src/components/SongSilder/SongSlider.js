import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { setSeekTime } from '../../store/slices/playerSlice';
import styles from "./SongSlider.style";

function SongSlider() {
    const dispatch = useDispatch(); 
    const { currentSong, isPlaying, duration } = useSelector((state) => state.player);
    const [currentTime, setCurrentTime] = useState(0);

    // Zamanlayıcıyı yöneten effect
    useEffect(() => {
        let interval;
        const maxDuration = duration > 0 ? duration : 30;

        if (isPlaying && currentSong) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => (prevTime < maxDuration ? prevTime + 1 : 0));
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSong, duration]);

    // Şarkı değiştiğinde saniyeyi sıfırla
    useEffect(() => {
        setCurrentTime(0);
    }, [currentSong]);

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
                onValueChange={(value) => setCurrentTime(value)}
                onSlidingComplete={(value) => dispatch(setSeekTime(value))}
            />
            <View style={styles.time_container}>
                <Text style={styles.time_text}>{formatTime(currentTime)}</Text>
                <Text style={styles.time_text}>{formatTime(duration || 30)}</Text>
            </View>
        </View>
    );
}

export default SongSlider;