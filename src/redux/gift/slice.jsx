import { createSlice } from '@reduxjs/toolkit';
import { fetchGifts, fetchUserName } from './operation';


const giftsSlice = createSlice({
    name: 'gifts',
    initialState: {
        giftRequests: [],
        loading: false,
        error: null,
        usernames: {}, // додали поле для імен користувачів
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchGifts
            .addCase(fetchGifts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGifts.fulfilled, (state, action) => {
                state.loading = false;
                state.giftRequests = action.payload.giftRequests;
            })
            .addCase(fetchGifts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchUserName
            .addCase(fetchUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserName.fulfilled, (state, action) => {
                state.loading = false;

                // очікується: [{ id: '1137391988417769583', username: 'Breed' }]
              const usernamesMap = {};
action.payload.users.forEach(user => {
    usernamesMap[user.id] = {
        username: user.username,
        globalName: user.globalName,
        avatar: user.avatar,
    };
});
state.usernames = {
    ...state.usernames,
    ...usernamesMap,
};
            })
            .addCase(fetchUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const giftsReducer = giftsSlice.reducer;