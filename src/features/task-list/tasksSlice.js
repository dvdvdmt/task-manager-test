/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {getTasks} from '../../utils/api.js';

const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
  taskById: {},
  tasksPerPage: 10,
  pageNumber: 0,
  currentPageTaskIds: [],
  filter: '',
};
const {reducer, actions} = createSlice({
  slice: 'tasks',
  initialState,
  reducers: {
    fetchStart: start,
    fetchSuccess: success,
    fetchFailure: failure,
    setTaskFilter(state, {payload}) {
      state.filter = payload;
      state.currentPageTaskIds = getCurrentPageTaskIds(state);
    },
  },
});

function start(state) {
  state.isLoading = true;
}

function success(state, {payload: tasks}) {
  state.isLoading = false;
  state.error = null;
  state.tasks = tasks;
  tasks.forEach((task) => {
    state.taskById[task.id] = task;
  });
  state.currentPageTaskIds = getCurrentPageTaskIds(state);
}

function failure(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

function getCurrentPageTaskIds({
  tasks,
  pageNumber,
  tasksPerPage,
  filter,
}) {
  const sliceStart = pageNumber * tasksPerPage;
  const sliceEnd = (pageNumber + 1) * tasksPerPage;
  if (filter) {
    tasks = tasks.filter(({summary}) => summary.includes(filter));
  }
  return tasks
    .slice(sliceStart, sliceEnd)
    .map(({id}) => id);
}

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setTaskFilter,
} = actions;

export function fetchTasks() {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const tasks = await getTasks();
      dispatch(fetchSuccess(tasks));
    } catch (e) {
      dispatch(fetchFailure(e.message));
      throw e;
    }
  };
}

export function tasksSelector({tasks}) {
  const {currentPageTaskIds, taskById} = tasks;
  const currentPageTasks = currentPageTaskIds.map((id) => taskById[id]);
  return {...tasks, currentPageTasks};
}

export default reducer;
