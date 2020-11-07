import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
    showData: mainReducer,
})

export default rootReducer;