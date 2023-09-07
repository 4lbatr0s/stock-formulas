import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stockListSP500: [],
    stockListBIST100: [],
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    getAllStocksStartSP500:(state)=>{
        state.isFetching=true;
    },
    getAllStocksSuccessSP500:(state,action)=>{
        state.isFetching=false;
        state.stockListSP500=action.payload;
    },
    getAllStocksFailedSP500:(state)=>{
        state.isFetching=false;
        state.error=true;
    },
    getAllStocksStartBIST100:(state)=>{
        state.isFetching=true;
    },
    getAllStocksSuccessBIST100:(state,action)=>{
        state.isFetching=false;
        state.stockListBIST100=action.payload;
    },
    getAllStocksFailedBIST100:(state)=>{
        state.isFetching=false;
        state.error=true;
    },
  },
});

export const {
    getAllStocksStartSP500,
    getAllStocksSuccessSP500,
    getAllStocksFailedSP500,
    getAllStocksStartBIST100,
    getAllStocksSuccessBIST100,
    getAllStocksFailedBIST100,
} = stockSlice.actions;

export default stockSlice.reducer;
