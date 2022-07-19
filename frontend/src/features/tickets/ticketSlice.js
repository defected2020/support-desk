import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      //thunkAPI allows us to get anything from any other state that we
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Open ticket
export const openTicket = createAsyncThunk(
  'tickets/reopen',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.openTicket(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get admin tickets
export const getAdminTickets = createAsyncThunk(
  'tickets/getAdminTickets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getAdminTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createTicket.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(getTickets.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tickets = action.payload
    })
    builder.addCase(getTickets.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(getTicket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.ticket = action.payload
    })
    builder.addCase(getTicket.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(closeTicket.fulfilled, (state, action) => {
      state.isLoading = false
      state.ticket = action.payload
    })
    builder.addCase(openTicket.fulfilled, (state, action) => {
      state.isLoading = false
      state.ticket = action.payload
    })
    builder.addCase(getAdminTickets.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAdminTickets.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tickets = action.payload
    })
    builder.addCase(getAdminTickets.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
