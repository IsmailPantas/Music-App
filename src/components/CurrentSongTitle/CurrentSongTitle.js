import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./CurrentSongTitle.style"
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




function CurrentSongTitle() {
    const dispatch = useDispatch();

    const { currentSong } = useSelector((state) => state.player);

    const favoriteList = useSelector((state) => state.favorites.favoriteList);

    const isFavorite = currentSong && favoriteList.some((item) => item.id === currentSong.id);
    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style= {styles.title}>{currentSong ? currentSong.title : "Şarkı Seçilmedi"}</Text>
                <Text style={styles.artist}>{currentSong ? currentSong.artist : "Şarkı Seçilmedi"}</Text>
            </View>
            <View>
                <View style={styles.icon_container}>
                    <TouchableOpacity 
                    onPress={() => dispatch(toggleFavorite(currentSong))}
                    activeOpacity={0.7}
                >
                    <Icon 
                        name={isFavorite ? "heart" : "heart-outline"} 
                        size={32} 
                        color={isFavorite ? "#FF5252" : "white"}
                    />
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CurrentSongTitle;