/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {authenticateUser, loginUser, logOutUser} from './api.js';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  data: {},
};
const {reducer, actions} = createSlice({
  slice: 'user',
  initialState,
  reducers: {
    authStart: start,
    authSuccess: success,
    authFailure: failure,
    logInStart: start,
    logInSuccess: success,
    logInFailure: failure,
    logOutStart: start,
    logOutSuccess() {
      return initialState;
    },
    logOutFailure: failure,
  },
});

function start(state) {
  state.isLoading = true;
}

function success(state, {payload}) {
  state.isLoading = false;
  state.isAuthenticated = true;
  state.data = payload;
}

function failure(state, action) {
  state.isLoading = false;
  state.isAuthenticated = false;
  state.error = action.payload;
}

export const {
  authStart,
  authSuccess,
  authFailure,
  logInStart,
  logInFailure,
  logInSuccess,
  logOutStart,
  logOutFailure,
  logOutSuccess,
} = actions;

export function authenticate() {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      const userData = await authenticateUser();
      dispatch(authSuccess(userData));
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
}

export function login(name, password) {
  return async (dispatch) => {
    try {
      dispatch(logInStart());
      const userData = await loginUser(name, password);
      dispatch(logInSuccess(userData));
    } catch (e) {
      dispatch(logInFailure(e.message));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(logOutStart());
      await logOutUser();
      dispatch(logOutSuccess());
    } catch (e) {
      dispatch(logOutFailure(e.message));
    }
  };
}

export function userSelector(store) {
  return store.user;
}

export default reducer;
