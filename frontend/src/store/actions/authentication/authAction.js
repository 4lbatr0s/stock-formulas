import { createAsyncThunk } from '@reduxjs/toolkit';
import thunkKeys from 'utils/constants/thunks';
import authServices from './authService';

const registerUser = createAsyncThunk(thunkKeys.REGISTER, authServices.registerUser);
const loginUser = createAsyncThunk(thunkKeys.LOGIN, authServices.userLogin);
const refreshToken = createAsyncThunk(thunkKeys.REFRESH, authServices.refreshToken);
const logOut = createAsyncThunk(thunkKeys.LOGOUT, authServices.logOut);

const actions = {
  registerUser,
  loginUser,
  refreshToken,
  logOut
};

export default actions;
