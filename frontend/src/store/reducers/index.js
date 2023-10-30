// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import news from './news';
import stock from './stock';
import auth from './authentication';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, news, stock, auth  });

export default reducers;
