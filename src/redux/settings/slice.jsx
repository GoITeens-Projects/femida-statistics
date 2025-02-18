import { createSlice } from '@reduxjs/toolkit';
import { fetchChannels, fetchSettings } from './operation';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        data: null,
        textChannels: [],
        voiceChannels: [],
        roles: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(state.data);

            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.loading = false;
                state.textChannels = action.payload.text.channels;
                state.voiceChannels = action.payload.voice.channels
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(state.data);

            });
    },
});

export const settingsReducer = settingsSlice.reducer;