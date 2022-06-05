import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../axiosConfig'

// Get User
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await api.get('/api/auth/user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await api.post('/api/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logutUser',
  async (_, thunkAPI) => {
    try {
      await api.post('/api/auth/logout/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      return true
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        if (state.user) {
          state.isAuthenticated = true
        } else {
          state.isAuthenticated = false
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        if (state.user) {
          state.isAuthenticated = true
          localStorage.setItem('token', action.payload.token)
        } else {
          state.isAuthenticated = false
          localStorage.removeItem('token')
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        localStorage.removeItem('token')
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
        localStorage.removeItem('token')
      })
  },
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
