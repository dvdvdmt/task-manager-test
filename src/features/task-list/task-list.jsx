import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TaskRow from './task-row/task-row.jsx';
import {fetchTasks, tasksSelector} from './tasksSlice.js';

export default function TaskList() {
  const dispatch = useDispatch();
  const {currentPageTasks} = useSelector(tasksSelector);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div data-test="task-list">
      {currentPageTasks.map((task) => (<TaskRow key={task.id} task={task} />))}
    </div>
  );
}
