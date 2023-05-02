import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stockList: []
};

const SP500Slice = createSlice({
  name: "sp500",
  initialState,
  reducers: {
    getAllStocksStart:(state)=>{
        state.isFetching=true;
    },
    getAllStocksSuccess:(state,action)=>{
        state.isFetching=false;
        state.stockList=action.payload;
    },
    getAllStocksFailed:(state)=>{
        state.isFetching=false;
        state.error=true;
    },
  },
});

export const {
    getAllStocksStart,
    getAllStocksSuccess,
    getAllStocksFailed
} = SP500Slice.actions;

export default SP500Slice.reducer;
