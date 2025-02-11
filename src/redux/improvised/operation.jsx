import { createAsyncThunk } from '@reduxjs/toolkit';

export const addInfo = createAsyncThunk('improvised/addInfo', async (body, thunkApi) => {
    return body
})