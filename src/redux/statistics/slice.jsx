import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics, completeMessagesLogs, fetchVoiceAndStage } from './operation';
import { login, updateToken } from '../auth/operation';


const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    serverMembers: [{ name: '', joined: 0, left: 0, total: 0 }],
    membersStatuses: [{ name: '', online: 0, away: 0, dnd: 0, offline: 0 }],
    messagesCount: [{ name: '', messages: 0 }],
    messagesLogs: [{ id: '', count: 0 }],
    ctivitiesCount: [],
    stageActivitiesLogs: [],
    voiseActivitiesCount: [],
    voiceActivitiesLogs: [],
    timestamp: [],
    updateToken: false,
    completedMessagesLogs: [],
    prevInterval: 0,
    prevPeriod: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatistics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        // state.membersLeft = action.payload.membersLeft;
        state.serverMembers = action.payload.serverMembers;
        state.membersStatuses = action.payload.membersStatuses;
        state.messagesCount = action.payload.messagesCount;
        state.messagesLogs = action.payload.messagesLogs;
        state.prevInterval = action.payload.prevInterval;
        state.prevPeriod = action.payload.prevPeriod;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(completeMessagesLogs.fulfilled, (state, action) => {
        state.completedMessagesLogs = action.payload;

      })
      .addCase(fetchVoiceAndStage.fulfilled, (state, action) => {
        state.stageActivitiesLogs = action.payload
      }).addCase(updateToken.pending, state => {
        state.loading = true;
        state.error = null; // Очищення помилки перед новою спробою
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.updateToken = action.payload
      })
      .addCase(updateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Відображення помилки
      })
      .addCase(login.fulfilled, (state, action) => {
        state.updateToken = action.payload.updateToken

      })
  },
});

export default statisticsSlice.reducer;

export const StatisticsReducer = statisticsSlice.reducer;
