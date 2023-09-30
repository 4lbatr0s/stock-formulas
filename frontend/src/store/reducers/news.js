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
      if(state.news.length>10) {
        state.news.pop();
      }
      state.news.push(action.payload);
    },
    removeNews(state) {
      state.news.pop();
    }
  }
});

export default news.reducer;

export const { openNewsDrawer, addNews, removeNews } = news.actions;
