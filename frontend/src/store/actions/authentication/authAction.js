import { createAsyncThunk } from '@reduxjs/toolkit';
import thunkKeys from 'utils/constants/thunks';
import authServices from './authService';

const registerUser = createAsyncThunk(thunkKeys.REGISTER, authServices.registerUser);
const loginUser = createAsyncThunk(thunkKeys.LOGIN, authServices.userLogin);

const actions = {
  registerUser,
  loginUser
};

export default actions;
