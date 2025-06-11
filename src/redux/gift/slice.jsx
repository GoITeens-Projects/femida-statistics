import { createSlice } from '@reduxjs/toolkit';
import { fetchGifts, fetchUserName, fetchGift } from './operation';

const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    giftRequests: [],
    selectedGifts: [], // масив окремо завантажених подарунків
    loading: false,
    error: null,
    usernames: {}, // мапа користувачів
  },
  reducers: {
    clearSelectedGifts(state) {
      state.selectedGifts = [];
    },
  },
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
      })

      // fetchGift
      .addCase(fetchGift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGift.fulfilled, (state, action) => {
        state.loading = false;
        const gift = action.payload;

        // Замінити існуючий gift, якщо він уже є
        const existingIndex = state.selectedGifts.findIndex(g => g._id === gift._id);
        if (existingIndex !== -1) {
          state.selectedGifts[existingIndex] = gift;
        } else {
          state.selectedGifts.push(gift);
        }
      })
      .addCase(fetchGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const giftsReducer = giftsSlice.reducer;