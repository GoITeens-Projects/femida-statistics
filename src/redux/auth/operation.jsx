import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';
import { Navigate } from 'react-router-dom';
import updateTokens from "../../utils/updateToken"

// Асинхронна дія для входу в акаунт
export const login = createAsyncThunk('auth/login', async (body, thunkApi) => {
  try {
    console.log(body);

    const res = await axios.post('/auth/login', body, {withCredentials: true, credentials: 'include'});
    console.log(res);
    const { accessToken, refreshToken } = res.data;
    // console.log(accessToken);
    const expires = new Date(new Date().getTime() + 1000 * 60 * 15 );
    // Збереження токенів в localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('expires', expires);
    // localStorage.setItem('refreshToken', refreshToken);
    const token = await updateTokens()

    return { accessToken, refreshToken, user: body.username, updateToken: token };
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || 'Помилка авторизації'
    );
  }
});

export const updateToken = createAsyncThunk('stats/updateToken', async (body, thunkApi) => {
    const res = await updateTokens()
    console.log("res:", res)
    return res
})