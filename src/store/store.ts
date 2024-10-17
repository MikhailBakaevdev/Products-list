import { configureStore } from '@reduxjs/toolkit'
import { carDealershipSlice } from './mainDataSlice'

export const store = configureStore({
  reducer: { data: carDealershipSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
