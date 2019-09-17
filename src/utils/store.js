import {combineReducers, configureStore} from 'redux-starter-kit';
import tasksReducer from '../features/task-list/tasksSlice.js';
import userReducer from './userSlice.js';

const reducer = combineReducers({user: userReducer, tasks: tasksReducer});

export default configureStore({reducer});
