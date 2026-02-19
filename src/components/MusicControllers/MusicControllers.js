import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./MusicController.style";
import { useSelector, useDispatch } from "react-redux";
import { togglePlay, toggleShuffle, toggleRepeat, playNextSong, playPreviousSong } from '../../store/slices/playerSlice';

function MusicControllers() {
    const dispatch = useDispatch();
    const { isPlaying, isShuffle, isRepeat } = useSelector((state) => state.player);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(toggleShuffle())}>
                <Icon name="shuffle" color={isShuffle ? "#1DB954" : "white"} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(playPreviousSong())}>
                <Icon name="skip-previous" color="white" size={60} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(togglePlay())}>
                <Icon name={isPlaying ? "pause-circle" : "play-circle"} color="white" size={80} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(playNextSong())}>
                <Icon name="skip-next" color="white" size={60} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => dispatch(toggleRepeat())}>
                <Icon name="repeat" color={isRepeat ? "#1DB954" : "white"} size={30} />
            </TouchableOpacity>
        </View>
    );
}

export default MusicControllers;