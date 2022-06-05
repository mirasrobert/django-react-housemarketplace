import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../axiosConfig'

// Get Houses
export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/houses/')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

const initialState = {
  isLoading: true,
  houses: [],
}

export const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHouses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHouses.fulfilled, (state, action) => {
        state.isLoading = false
        state.houses = action.payload
      })
  },
})

export const { resetState } = housesSlice.actions
export default housesSlice.reducer
