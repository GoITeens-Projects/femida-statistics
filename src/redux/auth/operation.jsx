import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Асинхронна дія для входу в акаунт
export const login = createAsyncThunk('auth/login', async (body, thunkApi) => {
    try {

        console.log(body);

        const res = await axios.post('/auth/login', body, { withCredentials: false });
        const { accessToken, refreshToken } = res.data;
        console.log(accessToken);

        return { accessToken, refreshToken };;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message || 'Помилка авторизації');
    }
});



