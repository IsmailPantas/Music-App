import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isPlaying: false,
    duration: 0,
    seekTime: 0,
    offlineSongs: {}, // Format: { [id]: { ...songData, offlinePath: '...' } }
  },
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.duration = 0;
      state.seekTime = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSeekTime: (state, action) => {
      state.seekTime = action.payload;
    },
    saveOfflinePath: (state, action) => {
      const { song, path } = action.payload;
      if (!state.offlineSongs) state.offlineSongs = {};
      
      // Şarkının tüm bilgisini (kapak, isim, artist) offlinePath ile mühürle
      state.offlineSongs[song.id] = {
        ...song,
        offlinePath: path 
      };
    },
    removeOfflinePath: (state, action) => {
      const id = action.payload;
      if (state.offlineSongs && state.offlineSongs[id]) {
        delete state.offlineSongs[id];
      }
    },
  },
});

export const { 
  setSong, togglePlay, setDuration, setSeekTime, saveOfflinePath, removeOfflinePath 
} = playerSlice.actions;
export default playerSlice.reducer;