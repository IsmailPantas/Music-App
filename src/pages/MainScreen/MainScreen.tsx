import React, { useState, useEffect } from "react";


// React Kütüphaneleri
import { FlatList, ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import Input from "../../components/Input";
import MusicCard from "../../components/MusicCard";
import styles from "./MainScreen.style"

// API entegrasyonu
import { searchMusic } from "../../services/musicApi";

import Loading from "../../components/Loading"


function MainScreen() {

    //State Managament
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch("mor ve ötesi");
    }, []);

    const handleSearch = async (text: string) => {
        const query = text.trim().toLowerCase();
        
        if (query.length > 0) {
            setLoading(true);
            const data = await searchMusic(query);
            setSongs(data);
            setLoading(false);
        }
    };

    const renderMusic = ({ item }: any) => <MusicCard song={item} />;

    return (
        

        <SafeAreaView style={styles.container}>

            <View style={styles.header_container}>
                <Text style={styles.header_title}>Ana Sayfa</Text>
            </View>

            <View style={styles.input_container}>

            <Input 
                placeholder="Aramak İstediğiniz Metni Girin..." 
                onChangeText={(value: string) => handleSearch(value)} 
            />
            </View>

            {loading ? (
                <Loading/>
            ) : (
                <FlatList
                    data={songs}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMusic}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </SafeAreaView>
    );
}




export default MainScreen;