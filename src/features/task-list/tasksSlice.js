/* eslint-disable no-param-reassign,no-unused-vars */
import {navigate} from 'hookrouter';
import {createSlice} from 'redux-starter-kit';
import {
  createNewTask, getTask, getTasks, updateTask,
} from '../../utils/api.js';

const initialState = {
  isFirstLoad: true,
  isLoading: false,
  isTaskSaving: false,
  isTaskCreating: false,
  error: null,
  taskById: {},
  tasksPerPage: 10,
  pageNumber: 0,
  currentPageTaskIds: [],
  filter: '',
  sortBy: {},
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
      state.taskById[task.id] = task;
    },
    fetchTaskFailure: failure,
    setTaskFilter(state, {payload}) {
      state.filter = payload;
      state.currentPageTaskIds = getCurrentPageTaskIds(state);
    },
    saveTaskStart(state) {
      state.isTaskSaving = true;
    },
    saveTaskFailure(state, {payload}) {
      state.isTaskSaving = false;
      state.error = payload;
    },
    saveTaskSuccess(state, {payload: task}) {
      state.isTaskSaving = false;
      state.taskById[task.id] = task;
    },
    createTaskStart(state) {
      state.isTaskCreating = true;
    },
    createTaskFailure(state, {payload: error}) {
      state.isTaskCreating = false;
      state.error = error;
    },
    createTaskSuccess(state, {payload: task}) {
      state.isTaskCreating = false;
      state.taskById[task.id] = task;
    },
    setSorting(state, {payload: {name, isActive}}) {
      state.sortBy[name] = isActive;
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
  taskById,
  pageNumber,
  tasksPerPage,
  filter,
  sortBy,
}) {
  const sliceStart = pageNumber * tasksPerPage;
  const sliceEnd = (pageNumber + 1) * tasksPerPage;
  let tasks = Object.values(taskById);
  if (filter) {
    tasks = tasks.filter(({summary}) => summary.includes(filter));
  }
  Object.entries(sortBy).forEach(([name, isActive]) => {
    if (isActive) {
      tasks = tasks.sort(compareByKey(name));
    }
  });
  return tasks
    .slice(sliceStart, sliceEnd)
    .map(({id}) => id);
}

function compareByKey(key) {
  return (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };
}

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTaskFailure,
  fetchTaskStart,
  fetchTaskSuccess,
  setTaskFilter,
  saveTaskStart,
  saveTaskFailure,
  saveTaskSuccess,
  createTaskStart,
  createTaskFailure,
  createTaskSuccess,
  setSorting,
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

export function saveTask(task) {
  return async (dispatch) => {
    try {
      dispatch(saveTaskStart());
      const updatedTask = await updateTask(task);
      dispatch(saveTaskSuccess(updatedTask));
    } catch (e) {
      dispatch(saveTaskFailure(e.message));
      throw e;
    }
  };
}

export function createTask(userId) {
  return async (dispatch) => {
    try {
      dispatch(createTaskStart());
      const newTask = await createNewTask(userId);
      navigate(`/tasks/${newTask.id}`);
      dispatch(createTaskSuccess(newTask));
    } catch (e) {
      dispatch(createTaskFailure(e.message));
      throw e;
    }
  };
}

export function tasksSelector({tasks}) {
  const {
    currentPageTaskIds, taskById, isFirstLoad, isLoading,
  } = tasks;
  const currentPageTasks = currentPageTaskIds.map((id) => taskById[id]);
  return {
    ...tasks,
    currentPageTasks,
    isLoading: isFirstLoad || isLoading,
  };
}

export function sortingSelector({tasks}) {
  return tasks.sortBy;
}

export default reducer;
