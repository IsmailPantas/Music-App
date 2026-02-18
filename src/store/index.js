import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import playerReducer from './slices/playerSlice';
import favoritesReducer from './slices/favoritesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['player', 'favorites'], 
};

const rootReducer = combineReducers({
  player: playerReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);