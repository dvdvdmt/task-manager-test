import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProgressSpinner from '../../components/progress-spinner/progress-spinner.jsx';
import {fetchUsers, usersSelector} from '../../utils/usersSlice.js';
import TaskFilter from './task-filter/task-filter.jsx';
import './task-list.scss';
import TaskTable from './task-table/task-table.jsx';
import {fetchTasks, tasksSelector} from './tasksSlice.js';

function TaskList() {
  const dispatch = useDispatch();
  const {isLoading: isTasksLoading} = useSelector(tasksSelector);
  const {isLoading: isUsersLoading} = useSelector(usersSelector);
  const isLoading = isTasksLoading || isUsersLoading;
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div data-test="task-list" className="task-list">
      <TaskFilter classes="task-list__card" />
      {
        isLoading
          ? <ProgressSpinner />
          : <TaskTable className="task-list__card" />
      }
    </div>
  );
}

export default TaskList;
