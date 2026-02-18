import React from "react";

// Favoriler için Redux Yapısı
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleFavorite } from '../../store/slices/favoritesSlice';

// React Kütüphaneleri
import { View, Text, Image, TouchableOpacity } from "react-native"

// Stil dosyası
import styles from "./MusicCard.style"

import { setSong } from '../../store/slices/playerSlice';


function MusicCard({ song }) {

    const dispatch = useDispatch();
    // Reduxdan favori liseti alma
    const favoriteList = useSelector((state) => state.favorites.favoriteList);

    // şarkının kontrolü
    const isFavorite = favoriteList.some((item) => item.id === song.id);

    const handlePlay = () => {
        const songData = {
            id: song.id,
            title: song.title,
            artist: song.artist.name,
            cover: song.album.cover_medium,
            preview: song.preview,
            album: song.album.title
        };
        dispatch(setSong(song));
    };


    return (
        <TouchableOpacity style={styles.container} onPress={handlePlay}>

            <Image
                source={{ uri: song.cover }}
                style={styles.song_cover}
            />

            <View style={styles.inner_container}>
                <Text style={styles.main_title} numberOfLines={1}>{song.title}</Text>
                <Text style={styles.artist_title} numberOfLines={1}>{song.artist}</Text>
                <Text style={styles.album_title} numberOfLines={1}>{song.album}</Text>
            </View>

            <TouchableOpacity
                onPress={() => dispatch(toggleFavorite(song))}
                style={styles.favorites}
            >
                <Icon
                    name={isFavorite ? "heart" : "heart-outline"}
                    color={isFavorite ? "#cf3824d5" : "white"}
                    size={25}
                />
            </TouchableOpacity>
        </TouchableOpacity>

    );
}

export default MusicCard