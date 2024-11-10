import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';
import { Navigate } from 'react-router-dom';

// Асинхронна дія для входу в акаунт
export const login = createAsyncThunk('auth/login', async (body, thunkApi) => {
  try {
    console.log(body);

    const res = await axios.post('/auth/login', body);
    console.log(res);
    const { accessToken, refreshToken } = res.data;
    // console.log(accessToken);
    const expires = new Date(new Date().getTime() + 1000 * 60 * 15);
    // Збереження токенів в localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('expires', expires);
    // localStorage.setItem('refreshToken', refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || 'Помилка авторизації'
    );
  }
});
