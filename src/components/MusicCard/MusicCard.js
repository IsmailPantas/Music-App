import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { setSong, saveOfflinePath, removeOfflinePath } from '../../store/slices/playerSlice';
import offlineService from "../../services/offlineService";
import styles from "./MusicCard.style";

function MusicCard({ song }) {
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);
    
    const favoriteList = useSelector((state) => state.favorites.favoriteList || []);
    const offlineSongs = useSelector((state) => state.player.offlineSongs || {});
    
    const isFavorite = favoriteList.some((item) => item.id === song.id);
    const isDownloaded = !!offlineSongs[song.id];

    const handlePlay = () => {
        dispatch(setSong(song));
    };

    const handleToggleDownload = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            if (isDownloaded) {
                const success = await offlineService.deleteSong(song.id);
                if (success) {
                    dispatch(removeOfflinePath(song.id));
                }
            } else {
                const localPath = await offlineService.downloadSong(song);
                if (localPath) {
                    // Şarkı objesini ve yolu birlikte gönderiyoruz
                    dispatch(saveOfflinePath({ song: song, path: localPath }));
                }
            }
        } catch (error) {
            console.error("İşlem hatası:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePlay}>
            <Image 
                source={{ uri: song.cover || (song.album && song.album.cover_medium) }} 
                style={styles.song_cover} 
            />
            
            <View style={styles.inner_container}>
                <Text style={styles.main_title} numberOfLines={1}>{song.title}</Text>
                <Text style={styles.artist_title} numberOfLines={1}>
                    {song.artist?.name || song.artist}
                </Text>
            </View>

            <View style={styles.action_container}>
                <TouchableOpacity onPress={handleToggleDownload} style={styles.download_btn}>
                    {isProcessing ? (
                        <ActivityIndicator size="small" color="#1DB954" />
                    ) : (
                        <Icon 
                            name={isDownloaded ? "check-circle" : "download-circle-outline"} 
                            color={isDownloaded ? "#1DB954" : "white"} 
                            size={25} 
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => dispatch(toggleFavorite(song))}>
                    <Icon
                        name={isFavorite ? "heart" : "heart-outline"}
                        color={isFavorite ? "#cf3824d5" : "white"}
                        size={25}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default MusicCard;