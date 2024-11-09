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
    console.log(accessToken);

    // Збереження токенів в localStorage
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);

    return { accessToken, refreshToken, user: body.username };
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || 'Помилка авторизації'
    );
  }
});
