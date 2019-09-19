import * as c from 'classnames';
import React from 'react';
import {useSelector} from 'react-redux';
import './task-table.scss';
import TaskRow from './task-row/task-row.jsx';
import {tasksSelector} from '../tasksSlice.js';

function TaskTable({className}) {
  const {currentPageTasks: tasks} = useSelector(tasksSelector);
  return (
    <div className={c(className, 'task-table')}>
      <div className="task-table__head">
        <div className="task-table__th">№</div>
        <div className="task-table__th">Summary</div>
        <div className="task-table__th">Due date</div>
        <div className="task-table__th">Author</div>
      </div>
      <div className="task-table__body">
        {tasks.map((task) => (<TaskRow key={task.id} task={task} />))}
      </div>
    </div>
  );
}

export default TaskTable;
