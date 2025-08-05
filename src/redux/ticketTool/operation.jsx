import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';


export const fetchTickets = createAsyncThunk('settings/fetchTickets', async (currPage, thunkApi) => {
    try {
         const accessToken = localStorage.getItem('token');
        const response = await axios.get('/tickets?page=1&perPage=5&to=now',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            } );

            console.log("response", response);
            const tickets = response.data.tickets.map(ticket => {
                const date = new Date(ticket.createdAt);
                return{
                id: ticket.id,
                name: ticket.ticketNumber,
                createAt: `${date.getDate()}/${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`,
                opener: ticket.opener,
            }});
            return {page: currPage, tickets};
    } catch (error) {
        console.log(error);
    }
        })

        export const getTicketId = createAsyncThunk('settings/fetchTickets', async (ticketId, thunkApi) => {
    try {
         const accessToken = localStorage.getItem('token');
        const response = await axios.get(`/tickets/${ticketId}`,  
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            } );
            console.log("response", response);
    } catch (error) {
        console.log(error);
    }
        })