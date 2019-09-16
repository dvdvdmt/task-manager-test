/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {authenticateUser, loginUser, logOutUser} from './api.js';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
};
const {reducer, actions} = createSlice({
  slice: 'user',
  initialState,
  reducers: {
    authStart: start,
    authSuccess: success,
    authFailure: failure,
    loginStart: start,
    loginSuccess: success,
    loginFailure: failure,
  },
});

function start(state) {
  state.isLoading = true;
}

function success(state) {
  state.isLoading = false;
  state.isAuthenticated = true;
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
  loginStart,
  loginFailure,
  loginSuccess,
} = actions;

export function authenticate() {
  return async (dispatch) => {
    try {
      dispatch(authStart());
      await authenticateUser();
      dispatch(authSuccess());
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
}

export function login(name, password) {
  return async (dispatch) => {
    try {
      dispatch(loginStart());
      await loginUser(name, password);
      dispatch(loginSuccess());
    } catch (e) {
      dispatch(loginFailure(e.message));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(loginStart());
      await logOutUser();
      dispatch(loginSuccess());
    } catch (e) {
      dispatch(loginFailure(e.message));
    }
  };
}

export function userSelector(store) {
  return store.user;
}

export default reducer;
