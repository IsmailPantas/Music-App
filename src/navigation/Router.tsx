import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store";

// Navigation Yapısı
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Router Stili ve Icon
import { tabOptions } from "./Router.style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens & Components
import MainScreen from "../pages/MainScreen";
import FavoritesScreen from "../pages/FavoritesScreen/FavoritesScreen";
import MusicPlayerScreen from "../pages/MusicPlayerScreen/MusicPlayerScreen";
import SearchScreen from "../pages/SearchScreen/SearchScreen";
import MiniPlayer from "../components/MiniPlayer/MiniPlayer";
import DownloadsScreen from "../pages/DownloadsScreen/DownloadsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Alt Menü Yapısı
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name="Main" component={MainScreen} options={{ tabBarLabel: "Ana Sayfa", tabBarIcon: ({ color, size }) => (<Icon name="home-variant" color={color} size={size} />)}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: "Arama Yap", tabBarIcon: ({ color, size }) => (<Icon name="magnify" color={color} size={size} />)}} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: "Favoriler", tabBarIcon: ({ color, size }) => (<Icon name="heart" color={color} size={size} />)}} />
      <Tab.Screen name="Downloads" component={DownloadsScreen} options={{ tabBarLabel: "İndirilenler", tabBarIcon: ({ color, size }) => (<Icon name="download-circle" color={color} size={size} />)}} />
    </Tab.Navigator>
  );
}

// ✅ Ana Router Yapısı
function Router() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
          {/* onReady sayesinde navigator tam yüklenmeden hiçbir alt bileşen (MiniPlayer dahil) hook çağıramaz */}
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="BottomTab" component={TabNavigator} />
              
              <Stack.Screen 
                name="Music Player" 
                component={MusicPlayerScreen} 
                options={{ 
                    presentation: 'modal',
                    animation: 'slide_from_bottom' 
                }} 
              />
            </Stack.Navigator>
            
            {/* ✅ MiniPlayer burada kalmalı, ancak içindeki hookları korumaya aldık */}
            <MiniPlayer />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

export default Router;