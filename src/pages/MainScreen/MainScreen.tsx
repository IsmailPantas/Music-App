// MainScreen.js
import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/Input";
import MusicCard from "../../components/MusicCard";
import styles from "./MainScreen.style";
import { searchMusic } from "../../services/musicApi";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { setQueue } from "../../store/slices/playerSlice";

// Ana Ekrana

function MainScreen() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        handleSearch("mor ve ötesi");
    }, []);

    const saveToGlobalHistory = async (item:any) => {
        if (!item) return;
        try {
            const saved = await AsyncStorage.getItem("@search_history");
            let history = saved ? JSON.parse(saved) : [];
            const itemId = typeof item === 'string' ? item : item.id;
            const newHistory = [
                item, 
                ...history.filter((i:any) => (typeof i === 'string' ? i : i.id) !== itemId)
            ].slice(0, 10);
            await AsyncStorage.setItem("@search_history", JSON.stringify(newHistory));
        } catch (e) { console.log("Hata:", e); }
    };

    const handleSearch = async (text:any) => {
        setSearchText(text);
        const query = text.trim().toLowerCase();
        if (query.length > 0) {
            setLoading(true);
            try {
                const data = await searchMusic(query);
                setSongs(data);
                // Mix havuzunu doldur
                if (data && data.length > 0) {
                    dispatch(setQueue(data));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const renderMusic = ({ item }:any) => (
        <View onTouchStart={() => saveToGlobalHistory(item)}> 
            <MusicCard song={item} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.header_title}>Ana Sayfa</Text>
            </View>
            <View style={styles.input_container}>
                <Input 
                    placeholder="Aramak İstediğiniz Metni Girin..." 
                    value={searchText} 
                    onChangeText={handleSearch} 
                    onSubmitEditing={() => saveToGlobalHistory(searchText)}
                />
            </View>
            {loading ? <Loading/> : (
                <FlatList
                    data={songs}
                    keyExtractor={(item:any) => item.id.toString()}
                    renderItem={renderMusic}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

export default MainScreen;