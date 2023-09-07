import {
    getAllStocksSuccessSP500,
    getAllStocksStartSP500,
    getAllStocksFailedSP500,
    getAllStocksSuccessBIST100,
    getAllStocksStartBIST100,
    getAllStocksFailedBIST100,
} from 'redux/stockSlice.js';
import { publicRequest } from 'helpers/AxiosHelper.js';
import { GET_SP500_STOCKS, GET_BIST100_STOCKS } from 'helpers/UrlHepler.js';

//INFO: HOW TO CREATE AN API CALL FOR REDUX!

export const getAllStocksCallSP500 = async (dispatch, query='') => {
    dispatch(getAllStocksStartSP500());
    try {
        const reqURI = query ? `${GET_SP500_STOCKS}?${query}` : GET_SP500_STOCKS; 
        const response = await  publicRequest.get(reqURI);
        console.log(reqURI);
        dispatch(getAllStocksSuccessSP500(response.data.data)); //TIP: If it's successfull then send response.data
    } catch (error) {
        dispatch(getAllStocksFailedSP500());
        console.log(error);
    }
};

export const getAllStocksCallBIST100 = async (dispatch, query='') => {
    dispatch(getAllStocksStartBIST100());
    try {
        const reqURI = query ? `${GET_BIST100_STOCKS}?${query}` : GET_BIST100_STOCKS; 
        const response = await  publicRequest.get(reqURI);
        console.log(reqURI);
        dispatch(getAllStocksSuccessBIST100(response.data.data)); //TIP: If it's successfull then send response.data
    } catch (error) {
        dispatch(getAllStocksFailedBIST100());
        console.log(error);
    }
};





