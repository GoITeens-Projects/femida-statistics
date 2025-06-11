
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
export const fetchGift = createAsyncThunk('settings/fetchGift', async (id, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get(`https://femida-api.onrender.com/gifts/requests/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('подарунки:', response.data);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження подарунка'
        );
    }
});

export const fetchUserName = createAsyncThunk(
  'settings/fetchUserName',
  async (ids, thunkApi) => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.get(
        `https://femida-api.onrender.com/discord/usernames?ids=${ids}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'Помилка завантаження імен користувачів'
      );
    }
  }
);