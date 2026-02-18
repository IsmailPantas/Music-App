import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isPlaying: false,
    duration: 0,
    seekTime: 0,
    offlineSongs: {}, 
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
      const { id, path } = action.payload;
      // undefinied hata çözümü
      if (!state.offlineSongs) {
        state.offlineSongs = {};
      }
      state.offlineSongs[id] = path;
    },
  },
});

export const { 
  setSong, 
  togglePlay, 
  setDuration, 
  setSeekTime, 
  saveOfflinePath 
} = playerSlice.actions;

export default playerSlice.reducer;