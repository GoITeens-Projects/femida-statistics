import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGifts,
  fetchUserName,
  fetchGift,
  fetchGiftManage   
} from './operation';

const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    giftRequests: [],
    selectedGifts: [],
    giftsManage: [],      
    loading: false,
    error: null,
    usernames: {},
  },
  reducers: {
    clearSelectedGifts(state) {
      state.selectedGifts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* ----- fetchGifts ----- */
      .addCase(fetchGifts.pending,   (state)        => { state.loading = true;  state.error = null; })
      .addCase(fetchGifts.fulfilled, (state, action)=> { state.loading = false; state.giftRequests = action.payload.giftRequests; })
      .addCase(fetchGifts.rejected,  (state, action)=> { state.loading = false; state.error = action.payload; })

      /* ----- fetchUserName ----- */
      .addCase(fetchUserName.pending,   (state)        => { state.loading = true;  state.error = null; })
      .addCase(fetchUserName.fulfilled, (state, action)=> {
        state.loading = false;
        const map = {};
        action.payload.users.forEach(u => {
          map[u.id] = { username: u.username, globalName: u.globalName, avatar: u.avatar };
        });
        state.usernames = { ...state.usernames, ...map };
      })
      .addCase(fetchUserName.rejected,  (state, action)=> { state.loading = false; state.error = action.payload; })

      /* ----- fetchGift ----- */
      .addCase(fetchGift.pending,   (state)        => { state.loading = true;  state.error = null; })
      .addCase(fetchGift.fulfilled, (state, action)=> {
        state.loading = false;
        const idx = state.selectedGifts.findIndex(g => g._id === action.payload._id);
        idx !== -1 ? state.selectedGifts[idx] = action.payload
                    : state.selectedGifts.push(action.payload);
      })
      .addCase(fetchGift.rejected,  (state, action)=> { state.loading = false; state.error = action.payload; })

      /* ----- fetchGiftManage  (NEW) ----- */
      .addCase(fetchGiftManage.pending,   (state)        => { state.loading = true;  state.error = null; })
     .addCase(fetchGiftManage.fulfilled, (state, action) => {
  state.loading = false;
  state.giftsManage = action.payload;  
})
      .addCase(fetchGiftManage.rejected,  (state, action)=> { state.loading = false; state.error = action.payload; });
  },
});

export const { clearSelectedGifts } = giftsSlice.actions; 
export const giftsReducer = giftsSlice.reducer;
