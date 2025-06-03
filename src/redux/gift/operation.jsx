
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';


export const fetchGifts = createAsyncThunk('settings/fetchGifts', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('https://femida-api.onrender.com/gifts/requests',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);
console.log('подарунки:', response.data);

        return response.data // Передача отриманих даних
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
});
