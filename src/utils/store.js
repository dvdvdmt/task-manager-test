import {combineReducers, configureStore} from 'redux-starter-kit';
import authReducer from './authSlice.js';

const reducer = combineReducers({auth: authReducer});

export default configureStore({reducer});
