// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  defaultId: 'news',
  news: []
};

// ==============================|| SLICE - MENU ||============================== //

const news = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews(state, action) {
      state.news.push(action.payload);
    },
    removeNews(state) {
      state.news.pop();
    }
  }
});

export default news.reducer;

export const { openNewsDrawer } = news.actions;
