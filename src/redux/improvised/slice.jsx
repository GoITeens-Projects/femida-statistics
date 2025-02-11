import { createSlice } from '@reduxjs/toolkit';
import { addInfo } from './operation';

const improvisedSlice = createSlice({
    name: 'improvised',
    initialState: {
        countOfXP:[],
        limits: []
    },
    extraReducers: (builder) => {
        builder.addCase(addInfo.fulfilled, (state, action)=>{
            state[action.payload.type] = action.payload.info
        })}})

        export const improvisedReducer = improvisedSlice.reducer;