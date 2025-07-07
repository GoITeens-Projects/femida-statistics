
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







export const PatchGift = createAsyncThunk(
  'settings/PatchGift',
  async ({ id, data }, thunkApi) => {
    try {
      const accessToken = localStorage.getItem('token');

      const response = await axios.patch(
        `https://femida-api.onrender.com/gifts/requests/${id}`,
        data, // тіло запиту
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Оновлено подарунок:', response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || 'Помилка оновлення подарунка'
      );
    }
  }
);



export const fetchGiftsManage = createAsyncThunk('settings/fetchGiftsManage', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('https://femida-api.onrender.com/gifts',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);


        return response.data.gifts // Передача отриманих даних
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
})


export const fetchGiftManage = createAsyncThunk('settings/fetchGiftManage', async (id, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get(`https://femida-api.onrender.com/gifts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },);


        return  response.data.gift
    } catch (error) {
        return thunkApi.rejectWithValue(
            error.response?.data?.message || 'Помилка завантаження налаштувань'
        );
    }
})

export const patchGift = createAsyncThunk(
  'settings/patchGiftManage',
  async ({ id, formData }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.patch(
        `https://femida-api.onrender.com/gifts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
           
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error updating gift'
      );
    }
  }
);
export const createGift = createAsyncThunk(
  'gifts/createGift',
  async (formData, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.post(
        'https://femida-api.onrender.com/gifts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Помилка при створенні подарунку');
    }
  }
);