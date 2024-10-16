import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateFilter = createAsyncThunk("filter/updateFilter",async (body, thunkApi) => {
    try {
        
      return body;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const setWindowWidth = createAsyncThunk("filter/setWindiwWidth", async (body,thunkApi)=>{
  return body
})