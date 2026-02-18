import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./MusicController.style"
import { useSelector, useDispatch } from "react-redux";
import { togglePlay } from '../../store/slices/playerSlice';


function MusicControllers() {

    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.player);


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Icon name="shuffle" color="white" size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="skip-previous" color="white" size={60} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(togglePlay())}>
                <Icon
                    name={isPlaying ? "pause-circle" : "play-circle"}
                    color="white"
                    size={80}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="skip-next" color="white" size={60} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="repeat" color="white" size={30} />
            </TouchableOpacity>
        </View>
    );
}

export default MusicControllers;