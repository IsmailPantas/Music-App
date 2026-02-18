import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteList: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const song = action.payload;
      const isExist = state.favoriteList.find((item) => item.id === song.id);

      if (isExist) {
        state.favoriteList = state.favoriteList.filter((item) => item.id !== song.id);
      } else {
        state.favoriteList.push(song);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;