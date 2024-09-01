import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axiosConfig";

// Токен доступу буде взятий з стейту authSlice
export const fetchStatistics = createAsyncThunk('stats/getStats', async (time, thunkApi) => {
    try {
        const state = thunkApi.getState();
        const { accessToken } = state.auth;
        console.log(accessToken);

        const res = await axios.get(`/stats`, { withCredentials: true }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue('Не вдалося отримати статистику');
    }
});
