import {
    pushNewsFailed,
    pushNewsStart,
    pushNewsSuccess,
    popNewsFailed,
    popNewsStart,
    popNewsSuccess
} from 'redux/newsSlice.js';


export const pushNewsCall = async (dispatch, news) => {
    dispatch(pushNewsStart());
    try {
        dispatch(pushNewsSuccess(news)); //TIP: If it's successfull then send response.data
    } catch (error) {
        dispatch(pushNewsFailed());
        console.log(error);
    }
};

export const popNewsCall = async (dispatch) => {
    dispatch(popNewsStart());
    try {
        dispatch(popNewsSuccess()); //TIP: If it's successfull then send response.data
    } catch (error) {
        dispatch(popNewsFailed());
        console.log(error);
    }
};






