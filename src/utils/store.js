import {combineReducers, configureStore} from 'redux-starter-kit';
import userReducer from './userSlice.js';

const reducer = combineReducers({user: userReducer});

export default configureStore({reducer});
