import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader.jsx';
import {fetchTask, saveTask, tasksSelector} from '../task-list/tasksSlice.js';

function TaskView({taskId}) {
  const dispatch = useDispatch();
  const {isLoading, taskById} = useSelector(tasksSelector);
  const task = taskById[taskId];
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (!task) {
      dispatch(fetchTask(taskId));
    }
  }, [dispatch]);
  useEffect(() => {
    if (task) {
      setSummary(task.summary);
      setDescription(task.description);
    }
  }, [task]);
  return isLoading
    ? <Loader />
    : (
      <div className="task-view" data-test="task-view">
        <input type="text" className="task-summary" data-test="task-summary" value={summary} onChange={onChangeTaskSummary} />
        <textarea className="task-description" data-test="task-description" value={description} onChange={onChangeTaskDescription} />
        <button type="button" data-test="save-task" onClick={onClickSaveTask}>Save task</button>
      </div>
    );

  function onClickSaveTask() {
    dispatch(saveTask({id: taskId, summary, description}));
  }

  function onChangeTaskSummary(e) {
    setSummary(e.target.value);
  }

  function onChangeTaskDescription(e) {
    setDescription(e.target.value);
  }
}

export default TaskView;
