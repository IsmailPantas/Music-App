import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch} from "react-redux";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { togglePlay } from '../../store/slices/playerSlice';
import styles from './MainMusicCard.style';


// Şuan çalan şarkının büyük resmi

function MainMusicCard () {

    const { currentSong } = useSelector((state) => state.player);

    return(
        <View style={styles.container}>

            <Image 
                source={{ uri: currentSong.cover }} 
                style={styles.song_cover} 
                resizeMode="cover"
            />
        </View>
    );
}

export default MainMusicCard;