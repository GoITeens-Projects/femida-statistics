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
        console.log('фетч сетінг');

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

        // console.log('Headers:', {
        //     Authorization: `Bearer ${accessToken}`,
        // });
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

export const fetchChannels = createAsyncThunk('settings/fetchChannels', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const textChannels = await axios.get('https://femida-api.onrender.com/discord/channels?type=0',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);

        const voiceChannels = await axios.get('https://femida-api.onrender.com/discord/channels?type=2',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);
        return { text: textChannels.data, voice: voiceChannels.data } // Передача отриманих даних
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
});

export const fetchRoles = createAsyncThunk('settings/fetchRoles', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('https://femida-api.onrender.com/discord/roles',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);

        return response.data.roles // Передача отриманих даних
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
});




