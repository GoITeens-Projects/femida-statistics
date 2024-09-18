import { createSlice } from "@reduxjs/toolkit";
import { updateFilter } from "./operation";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        interval: "days",
        unit: "hours",
        period: 1,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateFilter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateFilter.fulfilled, (state, action) => {
            state.loading = false;
            state.interval = action.payload.interval;
            state.unit = action.payload.unit;
            state.period = action.payload.period;
        })
        .addCase(updateFilter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
}
        
    }
);

export const filterReducer = filterSlice.reducer;