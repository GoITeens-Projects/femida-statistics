import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

// Асинхронна дія для отримання налаштувань
export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('/settings',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);
        return response.data; // Передача отриманих даних
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
});

export const PatchSettings = createAsyncThunk('settings/setting', async (body, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        console.log(accessToken);
        console.log('Headers:', {
            Authorization: `Bearer ${accessToken}`,
        });
        const res = await axios.patch('/settings', body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
