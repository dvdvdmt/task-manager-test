import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchTask, tasksSelector} from '../task-list/tasksSlice.js';

function TaskView({taskId}) {
  const dispatch = useDispatch();
  const {isLoading, taskById} = useSelector(tasksSelector);
  const task = taskById[taskId];
  useEffect(() => {
    if (!task) {
      dispatch(fetchTask(taskId));
    }
  }, [dispatch]);
  return isLoading
    ? <Loader />
    : (
      <div className="task-view" data-test="task-view">
        <div className="task-summary" data-test="task-summary">{task.summary}</div>
        <div className="task-description" data-test="task-description">{task.description}</div>
      </div>
    );
}

export default TaskView;
