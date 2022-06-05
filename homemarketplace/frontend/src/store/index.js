import { configureStore } from '@reduxjs/toolkit'

import housesReducer from '../features/houses/housesSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    houses: housesReducer,
  },
})
