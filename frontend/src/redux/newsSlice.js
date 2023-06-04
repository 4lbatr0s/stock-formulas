import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentNews: [],
  isFetching: false,
  error: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    pushNewsStart: (state) => {
      state.isFetching = true;
    },
    pushNewsSuccess: (state, action) => {
      state.isFetching = false;
      state.recentNews.unshift(action.payload);
    },
    pushNewsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    popNewsStart: (state) => {
      state.isFetching = true;
    },
    popNewsSuccess: (state) => {
      state.isFetching = false;
      state.recentNews.pop();
    },
    popNewsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { pushNewsStart, pushNewsSuccess, pushNewsFailed,  popNewsStart, popNewsSuccess, popNewsFailed } = newsSlice.actions;

export default newsSlice.reducer;
