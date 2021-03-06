/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {authenticateUser, loginUser, logOutUser} from './api.js';

const initialState = {
  isFirstLoad: true,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  name: null,
  fullName: null,
  avatarUrl: null,
  id: null,
  logInError: '',
};
const {reducer, actions} = createSlice({
  slice: 'user',
  initialState,
  reducers: {
    authStart: start,
    authSuccess: success,
    authFailure: failure,
    logInStart: start,
    logInSuccess(state, {
      payload: {
        name,
        fullName,
        avatarUrl,
        id,
      },
    }) {
      state.isFirstLoad = false;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.name = name;
      state.fullName = fullName;
      state.avatarUrl = avatarUrl;
      state.id = id;
      state.logInError = '';
    },
    logInFailure(state, {payload: error}) {
      state.isFirstLoad = false;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = error;
      state.logInError = 'Invalid username and password';
    },
    logOutStart: start,
    logOutSuccess(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logOutFailure: failure,
  },
});

function start(state) {
  state.isLoading = true;
}

function success(state, {
  payload: {
    name,
    fullName,
    avatarUrl,
    id,
  },
}) {
  state.isFirstLoad = false;
  state.isLoading = false;
  state.error = null;
  state.isAuthenticated = true;
  state.name = name;
  state.fullName = fullName;
  state.avatarUrl = avatarUrl;
  state.id = id;
}

function failure(state, action) {
  state.isFirstLoad = false;
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
      throw e;
    }
  };
}

export function userSelector(store) {
  const {user: {isFirstLoad, isAuthenticated}} = store;
  const isLogInNeeded = !isFirstLoad && !isAuthenticated;
  return {...store.user, isLogInNeeded};
}

export default reducer;
