// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import news from './news';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, news });

export default reducers;
