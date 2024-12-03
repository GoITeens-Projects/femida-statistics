import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const badWord = createAsyncThunk('settings/setting', async (body, thunkApi) => {
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
