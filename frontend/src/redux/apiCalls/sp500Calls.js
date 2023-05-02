import {
    getAllStocksSuccess,
    getAllStocksStart,
    getAllStocksFailed
} from 'redux/sp500Slice.js';
import { publicRequest } from 'helpers/AxiosHelper.js';
import { GET_SP500_STOCKS } from 'helpers/UrlHepler';

//INFO: HOW TO CREATE AN API CALL FOR REDUX!
export const getAllStocksStartCall = async (dispatch, query='') => {
    dispatch(getAllStocksStart());
    try {
        const reqURI = query ? `${GET_SP500_STOCKS}?${query}` : GET_SP500_STOCKS; 
        const response = await  publicRequest.get(reqURI);
        console.log(reqURI);
        dispatch(getAllStocksSuccess(response)); //TIP: If it's successfull then send response.data
    } catch (error) {
        dispatch(getAllStocksFailed());
        console.log(error);
    }
};



