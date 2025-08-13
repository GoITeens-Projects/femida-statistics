import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTickets, getTicketById } from './operation';

const ticketToolSlice = createSlice({
    name: 'ticketTool   ',
  initialState: {
  currentPage: 1,
  tickets: {
    1:[]
  },
  ticketsChats:{
  }
  },
      extraReducers: builder => {
        builder
          .addCase(fetchTickets.fulfilled, (state, action) => {
           state.currentPage = action.payload.page
           state.tickets[action.payload.page] = action.payload.tickets
          })
          .addCase(getTicketById.fulfilled, (state, action) => {
           state.ticketsChats[action.payload.id] = action.payload.ticketChat
          })
        
        
      },
});

export default ticketToolSlice.reducer;

export const TicketToolReducer = ticketToolSlice.reducer;