// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import news from './news';
import stock from './stock';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, news, stock });

export default reducers;
