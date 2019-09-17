/* eslint-disable no-param-reassign,no-unused-vars */
import {createSlice} from 'redux-starter-kit';
import {getTask, getTasks} from '../../utils/api.js';

const initialState = {
  isFirstLoad: true,
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
    fetchTasksStart: start,
    fetchTasksSuccess(state, {payload: tasks}) {
      state.isFirstLoad = false;
      state.isLoading = false;
      state.error = null;
      state.tasks = tasks;
      tasks.forEach((task) => {
        state.taskById[task.id] = task;
      });
      state.currentPageTaskIds = getCurrentPageTaskIds(state);
    },
    fetchTasksFailure: failure,
    fetchTaskStart: start,
    fetchTaskSuccess(state, {payload: task}) {
      state.isFirstLoad = false;
      state.isLoading = false;
      state.tasks.push(task);
      state.taskById[task.id] = task;
    },
    fetchTaskFailure: failure,
    setTaskFilter(state, {payload}) {
      state.filter = payload;
      state.currentPageTaskIds = getCurrentPageTaskIds(state);
    },
  },
});

function start(state) {
  state.isLoading = true;
}

function failure(state, action) {
  state.isFirstLoad = false;
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
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTaskFailure,
  fetchTaskStart,
  fetchTaskSuccess,
  setTaskFilter,
} = actions;

export function fetchTasks() {
  return async (dispatch) => {
    try {
      dispatch(fetchTasksStart());
      const tasks = await getTasks();
      dispatch(fetchTasksSuccess(tasks));
    } catch (e) {
      dispatch(fetchTasksFailure(e.message));
      throw e;
    }
  };
}

export function fetchTask(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchTaskStart());
      const tasks = await getTask(id);
      dispatch(fetchTaskSuccess(tasks));
    } catch (e) {
      dispatch(fetchTaskFailure(e.message));
      throw e;
    }
  };
}

export function tasksSelector({tasks}) {
  const {
    currentPageTaskIds, taskById, isFirstLoad, isLoading,
  } = tasks;
  const currentPageTasks = currentPageTaskIds.map((id) => taskById[id]);
  return {...tasks, currentPageTasks, isLoading: isFirstLoad || isLoading};
}

export default reducer;
