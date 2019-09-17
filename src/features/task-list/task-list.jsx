import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchUsers, usersSelector} from '../../utils/usersSlice.js';
import TaskRow from './task-row/task-row.jsx';
import {fetchTasks, tasksSelector} from './tasksSlice.js';

export default function TaskList() {
  const dispatch = useDispatch();
  const {currentPageTasks, isLoading: isTasksLoading} = useSelector(tasksSelector);
  const {isLoading: isUsersLoading} = useSelector(usersSelector);
  const isLoading = isTasksLoading || isUsersLoading;
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div data-test="task-list">
      {
        isLoading
          ? <Loader />
          : currentPageTasks.map((task) => (<TaskRow key={task.id} task={task} />))
      }
    </div>
  );
}
