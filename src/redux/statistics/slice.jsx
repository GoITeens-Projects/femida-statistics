import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics, completeMessagesLogs } from './operation';

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
    completedMessagesLogs: [],
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
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(completeMessagesLogs.fulfilled, (state, action) => {
        state.completedMessagesLogs = action.payload;
      });
  },
});

export default statisticsSlice.reducer;

export const StatisticsReducer = statisticsSlice.reducer;
