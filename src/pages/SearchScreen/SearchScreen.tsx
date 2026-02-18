import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native'; 
import Input from "../../components/Input";
import MusicCard from "../../components/MusicCard";
import styles from "./SearchScreen.style"; // ✅ Stilleri buradan alıyoruz

function SearchScreen() {
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState<string>(""); 
    const [history, setHistory] = useState<any[]>([]); 

    useEffect(() => {
        if (isFocused) {
            loadHistory();
        }
    }, [isFocused]);

    const loadHistory = async () => {
        try {
            const savedHistory = await AsyncStorage.getItem("@search_history");
            if (savedHistory !== null) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (e) {
            console.log("Yükleme hatası:", e);
        }
    };

    const handleSearch = async (text: string = searchQuery) => {
        const queryText = text.trim();
        if (queryText.length === 0) return;

        const savedHistory = await AsyncStorage.getItem("@search_history");
        let historyArray = savedHistory ? JSON.parse(savedHistory) : [];
        
        const newHistory = [
            queryText, 
            ...historyArray.filter((item: any) => (typeof item === 'string' ? item : item.id) !== queryText)
        ].slice(0, 10);
        
        setHistory(newHistory);
        await AsyncStorage.setItem("@search_history", JSON.stringify(newHistory));
    };

    const removeItem = async (idToRemove: any) => {
        const filteredHistory = history.filter(item => 
            (typeof item === 'string' ? item : item.id) !== idToRemove
        );
        setHistory(filteredHistory);
        await AsyncStorage.setItem("@search_history", JSON.stringify(filteredHistory));
    };

    const renderHistoryItem = ({ item }: { item: any }) => {
        // ✅ ŞARKI KARTI: Stiller dışarı taşındı
        if (typeof item === 'object' && item !== null) {
            return (
                <View style={styles.historyCardContainer}>
                    <View style={styles.musicCardWrapper}>
                        <MusicCard song={item} />
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.deleteButton} 
                        onPress={() => removeItem(item.id)}
                    >
                        <Icon name="close" size={20} color="#b3b3b3" />
                    </TouchableOpacity>
                </View>
            );
        }

        // ✅ METİN ARAMA: Stiller dışarı taşındı
        return (
            <View style={styles.historyItemContainer}>
                <TouchableOpacity 
                    style={styles.historyTextContainer} 
                    onPress={() => {
                        setSearchQuery(item);
                        handleSearch(item);
                    }}
                >
                    <Icon name="history" size={20} color="#b3b3b3" />
                    <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removeItem(item)}
                >
                    <Icon name="close" size={20} color="#b3b3b3" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Ara</Text>
            <Input 
                placeholder="Ne dinlemek istiyorsun?"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => handleSearch()}
                returnKeyType="search"
            />

            <View style={styles.historyHeaderContainer}>
                <Text style={styles.historyHeader}>Son aramalar</Text>
            </View>

            <FlatList 
                data={history}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderHistoryItem}
                ListEmptyComponent={<Text style={styles.emptyText}>Henüz bir arama yapmadın.</Text>}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

export default SearchScreen;