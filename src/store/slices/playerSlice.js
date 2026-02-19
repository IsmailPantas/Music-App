import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  duration: 0,
  seekTime: 0,
  isShuffle: false,
  isRepeat: false, 
  queue: [],
  offlineSongs: {}, 
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setQueue: (state, action) => {
      state.queue = Array.isArray(action.payload) ? action.payload : [];
    },
    setSong: (state, action) => {
      if (!action.payload) return;
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.seekTime = 0;
      if (!state.queue) state.queue = [];
      const exists = state.queue.find(s => s.id === action.payload.id);
      if (!exists) state.queue.push(action.payload);
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      if (state.isShuffle) state.isRepeat = false;
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
      if (state.isRepeat) state.isShuffle = false;
    },
    playNextSong: (state) => {
      if (!state.queue || state.queue.length === 0) {
        state.isPlaying = false;
        return;
      }

      let nextIndex = 0;
      const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);

      if (state.isShuffle && state.queue.length > 1) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * state.queue.length);
        } while (randomIndex === currentIndex);
        nextIndex = randomIndex;
      } else {
        nextIndex = (currentIndex + 1) % state.queue.length;
      }

      state.currentSong = state.queue[nextIndex];
      state.isPlaying = true;
      state.seekTime = 0;
    },
    playPreviousSong: (state) => {
      state.seekTime = state.seekTime === 0 ? 0.001 : 0;
      state.isPlaying = true;
    },
    togglePlay: (state) => { state.isPlaying = !state.isPlaying; },
    setDuration: (state, action) => { state.duration = action.payload; },
    setSeekTime: (state, action) => { state.seekTime = action.payload; },
  },
});

export const { 
  setSong, 
  setQueue, 
  togglePlay, 
  toggleShuffle, 
  toggleRepeat, 
  playNextSong, 
  playPreviousSong, 
  setDuration, 
  setSeekTime 
} = playerSlice.actions;

export default playerSlice.reducer;