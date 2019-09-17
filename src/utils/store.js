import {combineReducers, configureStore} from 'redux-starter-kit';
import tasksReducer from '../features/task-list/tasksSlice.js';
import userReducer from './userSlice.js';
import usersReducer from './usersSlice.js';

const reducer = combineReducers({user: userReducer, tasks: tasksReducer, users: usersReducer});

export default configureStore({reducer});
