/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {getTasks} from '../../utils/api.js';

const initialState = {
  isLoading: false,
  error: null,
  taskById: {},
  tasksPerPage: 10,
  pageNumber: 0,
  currentPageTaskIds: [],
};
const {reducer, actions} = createSlice({
  slice: 'tasks',
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

function success(state, {payload: tasks}) {
  state.isLoading = false;
  state.error = null;
  tasks.forEach((task) => {
    state.taskById[task.id] = task;
  });
  const sliceStart = state.pageNumber * state.tasksPerPage;
  const sliceEnd = (state.pageNumber + 1) * state.tasksPerPage;
  state.currentPageTaskIds = tasks
    .slice(sliceStart, sliceEnd)
    .map(({id}) => id);
}

function failure(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = actions;

export function fetchTasks() {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const tasks = await getTasks();
      dispatch(fetchSuccess(tasks));
    } catch (e) {
      dispatch(fetchFailure(e.message));
    }
  };
}

export function tasksSelector({tasks}) {
  const {currentPageTaskIds, taskById} = tasks;
  const currentPageTasks = currentPageTaskIds.map((id) => taskById[id]);
  return {...tasks, currentPageTasks};
}

export default reducer;
