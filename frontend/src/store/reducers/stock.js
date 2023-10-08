// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  currentPrices: {},
  isLoading: false,
  isError: false
};

// ==============================|| SLICE - stock ||============================== //

const stock = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    stockSetNewPrice(state, action) {
      state.currentPrices[action.payload.stockSymbol] = action.payload.newPrice;
    },
    stockIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    stockIsError(state, action) {
      state.isError = action.payload;
    }
  }
});

export default stock.reducer;

export const { stockSetNewPrice, stockIsLoading, stockIsError  } = stock.actions;
