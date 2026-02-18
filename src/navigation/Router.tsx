import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store";

// Navigation Yapısı
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Router Stili ve Icon
import { tabOptions } from "./Router.style";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens & Components
import MainScreen from "../pages/MainScreen"
import FavoritesScreen from "../pages/FavoritesScreen/FavoritesScreen"
import MusicPlayerScreen from "../pages/MusicPlayerScreen/MusicPlayerScreen"
import MiniPlayer from "../components/MiniPlayer";

const Tab = createBottomTabNavigator();

function Router() {
  return (
    <Provider store={store}>
      {/* ✅ PersistGate: Hafızadaki veriler gelene kadar bekler */}
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator screenOptions={tabOptions}>
              <Tab.Screen 
                name="Main" 
                component={MainScreen}
                options={{
                  tabBarLabel: "Ana Sayfa",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="home-variant" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen 
                name="Favorites" 
                component={FavoritesScreen}
                options={{
                  tabBarLabel: "Favoriler",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="heart" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen 
                name="Music Player" 
                component={MusicPlayerScreen}
                options={{
                  tabBarLabel: "Şu An Çalan",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="play-circle" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
            {/* Hook kurallarına göre düzenlediğimiz MiniPlayer burada kalmalı */}
            <MiniPlayer />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

export default Router;