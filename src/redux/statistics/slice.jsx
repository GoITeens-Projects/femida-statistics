
import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operation";

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default statisticsSlice.reducer;

export const StatisticsReducer = statisticsSlice.reducer;