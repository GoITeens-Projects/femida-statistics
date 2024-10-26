
import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operation";

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        serverMembers: [{ "name": "", "joined": 0, "left": 0, "total": 0 }],
        membersStatuses: [{ "name": '', "online": 0, "away": 0, "dnd": 0, "offline": 0 }],
        messagesCount: [{"name": '', "messages": 0}],
        messagesLogs: [{id: '', count: 0}],
        stageActivitiesCount: [],
        stageActivitiesLogs: [],
        voiseActivitiesCount: [],
        voiceActivitiesLogs: [],
        timestamp: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
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
                // state.totalMembers = action.payload.totalMembers;
                // state.stageActivitiesCount = action.payload.stageActivitiesCount;
                // state.stageActivitiesLogs = action.payload.stageActivitiesLogs;
                // state.voiseActivitiesCount = action.payload.voiseActivitiesCount;
                // state.voiceActivitiesLogs = action.payload.voiceActivitiesLogs;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default statisticsSlice.reducer;

export const StatisticsReducer = statisticsSlice.reducer;