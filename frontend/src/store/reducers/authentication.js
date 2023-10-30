// types
import { createSlice } from '@reduxjs/toolkit';
import actions from 'store/actions/authentication/authAction';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

// initial state
const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false
};
// ==============================|| SLICE - MENU ||============================== //

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }) {
      state.userInfo = payload;
    }
  },
  extraReducers: {
    [actions.loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [actions.loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.tokens.accessToken;
      state.refreshToken = payload.tokens.refreshToken;
    },
    [actions.loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [actions.registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [actions.registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload;
    },
    [actions.registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
