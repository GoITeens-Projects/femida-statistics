import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTickets, getTicketId } from './operation';

const ticketToolSlice = createSlice({
    name: 'ticketTool   ',
  initialState: {
  currentPage: 1,
  tickets: {
    1:[]
  },
  },
      extraReducers: builder => {
        builder
          .addCase(fetchTickets.fulfilled, (state, action) => {
           state.currentPage = action.payload.page
           state.tickets[action.payload.page] = action.payload.tickets
          })
        
      },
});

export default ticketToolSlice.reducer;

export const TicketToolReducer = ticketToolSlice.reducer;