import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGifts,        // список запитів користувачів
  fetchUserName,     // мапа userId → username
  fetchGift,         // okremyi gift із заявки
  fetchGiftsManage,  // список усіх подарунків (для таблиці)
  fetchGiftManage,
  patchGift,
  createGift,   // 🔸 один подарунок за ID (для модалки)
} from './operation';

const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    /* ---- списки ---- */
    giftRequests: [],
    selectedGifts: [],
    giftsManage: [],

    /* ---- поточний подарунок (giftId) ---- */
    currentGift: null,
    loadingCurrent: false,
    errorCurrent: null,

    /* ---- загальні флаги/помилки ---- */
    loading: false,      // використовується для “глобальних” запитів
    error: null,

    /* ---- мапа юзерів ---- */
    usernames: {},

  creating: false,
  patching: false,
  },
  reducers: {
    clearSelectedGifts(state) {
      state.selectedGifts = [];
    },
  },
  extraReducers: builder => {
    /* ===== 1. СПИСОК ЗАПИТІВ ===== */
    builder
      .addCase(fetchGifts.pending,   state => { state.loading = true;  state.error = null; })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.loading = false;
        state.giftRequests = action.payload.giftRequests;
      })
      .addCase(fetchGifts.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    /* ===== 2. ІНФО ПРО КОРИСТУВАЧІВ ===== */
    builder
      .addCase(fetchUserName.pending,   state => { state.loading = true;  state.error = null; })
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.loading = false;
        const map = {};
        action.payload.users.forEach(u => {
          map[u.id] = { username: u.username, globalName: u.globalName, avatar: u.avatar };
        });
        state.usernames = { ...state.usernames, ...map };
      })
      .addCase(fetchUserName.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    /* ===== 3. ОКРЕМИЙ GIFТ ІЗ ЗАПИТУ ===== */
    builder
      .addCase(fetchGift.pending,   state => { state.loading = true;  state.error = null; })
      .addCase(fetchGift.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.selectedGifts.findIndex(g => g._id === action.payload._id);
        idx !== -1 ? (state.selectedGifts[idx] = action.payload)
                    : state.selectedGifts.push(action.payload);
      })
      .addCase(fetchGift.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    /* ===== 4. СПИСОК ПОДАРУНКІВ (Manage‑таблиця) ===== */
    builder
      .addCase(fetchGiftsManage.pending,   state => { state.loading = true;  state.error = null; })
      .addCase(fetchGiftsManage.fulfilled, (state, action) => {
        state.loading = false;
        state.giftsManage = action.payload;
      })
      .addCase(fetchGiftsManage.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    /* ===== 5. ОДИН ПОДАРУНОК ЗА ID (для модалки) ===== */
    builder
      .addCase(fetchGiftManage.pending,   state => { state.loadingCurrent = true;  state.errorCurrent = null; })
      .addCase(fetchGiftManage.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.currentGift = action.payload;  // { ...gift }
      })
      .addCase(fetchGiftManage.rejected,  (state, action) => {
        state.loadingCurrent = false;
        state.errorCurrent = action.payload;
      });
        /* ===== 6. СТВОРЕННЯ ПОДАРУНКУ ===== */
    builder
      .addCase(createGift.pending, state => {
        state.creating = true;
      })
      .addCase(createGift.fulfilled, (state, action) => {
        state.creating = false;
        state.giftsManage.push(action.payload?.gift); // якщо потрібно додати в список
      })
      .addCase(createGift.rejected, (state, action) => {
        state.creating = false;
      });

    /* ===== 7. ОНОВЛЕННЯ ПОДАРУНКУ ===== */
    builder
      .addCase(patchGift.pending, state => {
        state.patching = true;
      })
      .addCase(patchGift.fulfilled, (state, action) => {
        state.patching = false;
        // опціонально оновити giftsManage або currentGift
      })
      .addCase(patchGift.rejected, (state, action) => {
        state.patching = false;
      });
  },

  
});

export const { clearSelectedGifts } = giftsSlice.actions;
export const giftsReducer = giftsSlice.reducer;
