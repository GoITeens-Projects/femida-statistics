import { createSlice } from '@reduxjs/toolkit';
import { fetchGifts } from './operation';

const giftsSlice = createSlice({
    name: 'gifts',
    initialState: {
        giftRequests: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGifts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGifts.fulfilled, (state, action) => {
                state.loading = false;
                state.giftRequests = action.payload.giftRequests; // ← тут приходить масив giftRequests
            })
            .addCase(fetchGifts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const giftsReducer = giftsSlice.reducer;