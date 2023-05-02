import {
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
    setSidenavColor,
    setFixedNavbar,
    setOpenConfigurator,
    setDirection,
    setLayout,
    setDarkMode,
    setTransparentNavbar,
} from 'redux/materialUISlice';
import { publicRequest } from 'helpers/AxiosHelper.js';
//INFO: HOW TO CREATE AN API CALL FOR REDUX!

export const setMiniSidenavCall = (dispatch, value) => {
    // dispatch(loginStart());
    try {
        dispatch(setMiniSidenav(value)); //TIP: If it's successfull then send response.data
    } catch (error) {
        // dispatch(loginFailure());
        console.log(error);
    }
};

export const setTransparentSidenavCall = (dispatch, value) => {
    try {
        dispatch(setTransparentSidenav(value));
    } catch (error) {
        console.log(error);
    }
};

export const setWhiteSidenavCall = (dispatch, value) => {
    try {
        dispatch(setWhiteSidenav(value));
    } catch (error) {
        console.log(error);
    }
};

export const setSidenavColorCall = (dispatch, value) => {
    try {
        dispatch(setSidenavColor(value));
    } catch (error) {
        console.log(error);
    }
};

export const setTransparentNavbarCall = (dispatch, value) => {
    try {
        dispatch(setTransparentNavbar(value));
    } catch (error) {
        console.log(error);
    }
};

export const setFixedNavbarNavbarCall = (dispatch, value) => {
    try {
        dispatch(setFixedNavbar(value));
    } catch (error) {
        console.log(error);
    }
};

export const setOpenConfiguratorCall = (dispatch, value) => {
    try {
        dispatch(setOpenConfigurator(value));
    } catch (error) {
        console.log(error);
    }
};

export const setDirectionCall = (dispatch, value) => {
    try {
        dispatch(setDirection(value));
    } catch (error) {
        console.log(error);
    }
};

export const setLayoutCall = (dispatch, value) => {
    try {
        dispatch(setLayout(value));
    } catch (error) {
        console.log(error);
    }
};

export const setDarkModeCall = (dispatch, value) => {
    try {
        dispatch(setDarkMode(value));
    } catch (error) {
        console.log(error);
    }
};

export const setFixedNavbarCall = (dispatch, value) => {
    try {
        dispatch(setFixedNavbar(value));
    } catch (error) {
        console.log(error);
    }
};

