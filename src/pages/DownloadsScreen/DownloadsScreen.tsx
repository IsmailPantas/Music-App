import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux'; 
import NetInfo from "@react-native-community/netinfo";
import { setSong } from '../../store/slices/playerSlice'; 
import MusicCard from "../../components/MusicCard";
import styles from "./DownloadsScreen.style"; 

function DownloadsScreen() {
    // 1. Hooklar her zaman en üstte ve sabit sırada!
    const dispatch = useDispatch();
    const [isConnected, setIsConnected] = useState<boolean | null>(true);
    
    // Selector'u güvenli hale getirdik (undefined dönmesin diye)
    const offlineSongs = useSelector((state: any) => state?.player?.offlineSongs || {});

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    // Veriyi güvenli bir şekilde diziye çeviriyoruz
    const downloadedList = Object.values(offlineSongs).filter(item => item !== null && item !== undefined);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.header}>İndirilenler</Text>
                {!isConnected && (
                    <View style={styles.offline_badge}>
                        <Text style={styles.offline_text}>OFFLINE</Text>
                    </View>
                )}
            </View>
            
            <FlatList 
                data={downloadedList} 
                // ✅ toString hatasını önlemek için güvenli keyExtractor
                keyExtractor={(item: any) => (item?.id ? item.id.toString() : Math.random().toString())}
                renderItem={({ item }) => {
                    if (!item) return null; // Güvenlik katmanı
                    return (
                        <TouchableOpacity 
                            style={styles.card_wrapper} 
                            onPress={() => dispatch(setSong(item))}
                        >
                            <MusicCard song={item} />
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.empty_container}>
                        <Text style={styles.empty_text}>Henüz indirilmiş şarkı bulunmuyor.</Text>
                    </View>
                }
                contentContainerStyle={styles.list_content}
            />
        </SafeAreaView>
    );
}

export default DownloadsScreen;