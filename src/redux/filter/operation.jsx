import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateFilter = createAsyncThunk("filter/updateFilter",async (body, thunkApi) => {
    try {
        
      return body;
    } catch (error) {
      return error.response.data;
    }
  }
);