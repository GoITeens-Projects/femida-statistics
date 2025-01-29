import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchStatistics, completeLogs, fetchVoiceAndStage } from './operation';
import { login, updateToken } from '../auth/operation';

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    serverMembers: [{ name: '', joined: 0, left: 0, total: 0 }],
    membersStatuses: [{ name: '', online: 0, away: 0, dnd: 0, offline: 0 }],
    messagesCount: [{ time: '', count: 0 }],
    messagesLogs: [{ id: '', count: 0 }],
    stageActivitiesCount: [{ time: '', count: { hours: 0, minutes: 0 } }],
    stageActivitiesLogs: [{ id: '', count: 0 }],
    voiceActivitiesCount: [{ time: '', count: { hours: 0, minutes: 0 } }],
    voiceActivitiesLogs: [{ id: '', count: 0 }],
    timestamp: [],
    updateToken: false,
    completedMessagesLogs: [
      {
        username: '',
        globalName: '',
        id: 0,
        avatar: ``,
        count: 0,
        loading: true,
      },
    ],
    completedVoicesLogs: [
      {
        username: '',
        globalName: '',
        id: 0,
        avatar: ``,
        count: { hours: 0, minutes: 0 },
        loading: true,
      },
    ],
    completedStagesLogs: [
      {
        username: '',
        globalName: '',
        id: 0,
        avatar: ``,
        count: { hours: 0, minutes: 0 },
        loading: true,
      },
    ],
    prevInterval: 0,
    prevPeriod: 0,
    loading: true,
    error: null,
    reloadProtocol: false,
    reloadTrying: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
        }
        // state.membersLeft = action.payload.membersLeft;
        state.reloadProtocol = false;
        state.reloadTrying = 0;
        state.serverMembers = action.payload.serverMembers;
        state.membersStatuses = action.payload.membersStatuses;
        state.messagesCount = action.payload.messagesCount;
        state.messagesLogs = action.payload.messagesLogs;
        state.prevInterval = action.payload.prevInterval;
        state.prevPeriod = action.payload.prevPeriod;
      })
      .addCase(completeLogs.fulfilled, (state, action) => {
        // if(state.loading === true){
        //   state.loading = false;}
        // state.reloadProtocol = false;
        // state.reloadTrying = 0;
        state.completedMessagesLogs = action.payload.message;
        state.completedVoicesLogs = action.payload.voice;
        state.completedStagesLogs = action.payload.stage;
      })
      .addCase(fetchVoiceAndStage.fulfilled, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
        }
        state.stageActivitiesCount = action.payload.stageActivitiesCount;
        state.stageActivitiesLogs = action.payload.stageActivitiesLogs;
        state.voiceActivitiesCount = action.payload.voiceActivitiesCount;
        state.voiceActivitiesLogs = action.payload.voiceActivitiesLogs;
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        // state.loading = false;
        state.updateToken = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.loading = false;
        state.updateToken = action.payload.updateToken;
      })
      .addMatcher(
        isAnyOf(
          fetchStatistics.pending,
          // completeLogs.pending,
          fetchVoiceAndStage.pending
        ),
        state => {
          state.loading = true;
          state.error = null;
          state.reloadProtocol = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchStatistics.rejected,
          // completeLogs.rejected,
          fetchVoiceAndStage.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          if (state.reloadTrying < 3) {
            state.reloadProtocol = true;
            state.reloadTrying = state.reloadTrying + 1;
          }
        }
      );
  },
});

export default statisticsSlice.reducer;

export const StatisticsReducer = statisticsSlice.reducer;
