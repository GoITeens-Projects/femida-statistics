import { createSlice } from '@reduxjs/toolkit';
import { login } from './operation';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Інформація про користувача
    accessToken: null, // Токен доступу
    refreshToken: null, // Токен для оновлення
    loading: false, // Статус завантаження
    error: null, // Статус помилки
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null; // Очищення помилки перед новою спробою
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken; // Збереження токену доступу
        state.refreshToken = action.payload.refreshToken; // Збереження токену оновлення
        state.user = action.payload.user || null; // Збереження інформації про користувача, якщо доступно
        window.location.href = '/Overview';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Відображення помилки
      });
  },
});

export default authSlice.reducer;
