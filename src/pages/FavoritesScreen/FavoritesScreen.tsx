import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Input from "../../components/Input";

// Redux ve Bileşenler
import MusicCard from "../../components/MusicCard/MusicCard";
import styles from "./FavoritesScreen.style";

function FavoritesScreen() {
    // Orjinal favori listesi
    const favoriteList = useSelector((state: any) => state.favorites?.favoriteList || []);
    
    // filtre için state
    const [filteredList, setFilteredList] = useState<any[]>(favoriteList);

    // anlık favorileri güncelleme
    useEffect(() => {
        setFilteredList(favoriteList);
    }, [favoriteList]);

    const handleSearch = (text: string) => {
        const query = text.trim().toLowerCase();
        
        if (query.length === 0) {
            setFilteredList(favoriteList);
        } else {
            const filtered = favoriteList.filter((song: any) => {
                const title = song.title?.toLowerCase() || "";
                const artist = song.artist?.toLowerCase() || "";
                return title.includes(query) || artist.includes(query);
            });
            setFilteredList(filtered);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.header_title}>Favoriler</Text>
            </View>

            <View style= {styles.input_container}>

            <Input 
                placeholder={"Favorilerde Arayınız..."} 
                onChangeText={(value: string) => handleSearch(value)} 
            />
            </View>
            

            {filteredList.length > 0 ? (
                <FlatList
                    data={filteredList}
                    renderItem={({ item }) => <MusicCard song={item} />}
                    keyExtractor={(item: any) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            ) : (
                <View style={styles.empty_container}>
                    <Text style={styles.empty_text}>
                        {favoriteList.length === 0 ? "Henüz bir şarkı beğenmediniz." : "Aradığınız kriterde şarkı bulunamadı."}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default FavoritesScreen;