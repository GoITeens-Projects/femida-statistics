import { createSlice } from "@reduxjs/toolkit";
import { updateFilter } from "./operation";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        interval: "days",
        units: "hours",
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
            state = {...state, ...action.payload};
        })
        .addCase(fetchStatistics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
}
        
    }
);

export const FilterReducer = filterSlice.reducer;