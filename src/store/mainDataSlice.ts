import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { v4 as uuidv4 } from 'uuid';


export interface CarDealership {
    id: string,
    name: string;
    productTypes: String[];
    productsCounter: string;
}

function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("redux");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState).data;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
}

const initialState: CarDealership[] = loadFromLocalStorage() ?? [];

export const carDealershipSlice = createSlice({
  name: 'carDealership',
  initialState,
  reducers: {
    write: (state, action: PayloadAction<CarDealership>) => {
        const newState = [...state, {...action.payload, id: uuidv4()}]
        return newState;
    },
    edit: (state, action: PayloadAction<CarDealership>) => {
        const newState = state.map(item => {
                if (item.id === action.payload.id) {
                   return action.payload;
                }
    
                return item;
            })
        return newState;
    },
  },
})

export const { write, edit } = carDealershipSlice.actions

export const selectCarDealerships = (state: RootState) => state;

export default carDealershipSlice.reducer