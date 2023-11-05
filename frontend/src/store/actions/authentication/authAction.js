import { createAsyncThunk } from '@reduxjs/toolkit';
import thunkKeys from 'utils/constants/thunks';
import authServices from './authService';

const registerUser = createAsyncThunk(thunkKeys.REGISTER, authServices.registerUser);
const loginUser = createAsyncThunk(thunkKeys.LOGIN, authServices.userLogin);
const refreshToken = createAsyncThunk(thunkKeys.REFRESH, authServices.refreshToken);

const actions = {
  registerUser,
  loginUser,
  refreshToken
};

export default actions;
