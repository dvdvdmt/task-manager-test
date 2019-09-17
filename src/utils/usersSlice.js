/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {getUsers} from './api.js';

const initialState = {
  isFirstLoad: true,
  isLoading: false,
  error: null,
  userById: {},
};
const {reducer, actions} = createSlice({
  slice: 'users',
  initialState,
  reducers: {
    fetchStart: start,
    fetchSuccess: success,
    fetchFailure: failure,
  },
});

function start(state) {
  state.isLoading = true;
}

function success(state, {payload: users}) {
  state.isFirstLoad = false;
  state.isLoading = false;
  state.error = null;
  users.forEach((user) => {
    state.userById[user.id] = user;
  });
}

function failure(state, action) {
  state.isFirstLoad = false;
  state.isLoading = false;
  state.error = action.payload;
}

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = actions;

export function fetchUsers() {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const users = await getUsers();
      dispatch(fetchSuccess(users));
    } catch (e) {
      dispatch(fetchFailure(e.message));
      throw e;
    }
  };
}

export function userByIdSelector(userId) {
  return ({users}) => users.userById[userId];
}

export function usersSelector({users}) {
  return {users, isLoading: users.isFirstLoad || users.isLoading};
}

export default reducer;
