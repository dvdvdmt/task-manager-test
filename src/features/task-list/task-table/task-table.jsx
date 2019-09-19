import * as c from 'classnames';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSorting, sortingSelector, tasksSelector} from '../tasksSlice.js';
import TaskRow from './task-row/task-row.jsx';
import './task-table.scss';

function TaskTable({className}) {
  const {currentPageTasks: tasks} = useSelector(tasksSelector);
  return (
    <div className={c(className, 'task-table')}>
      <div className="task-table__head">
        <div data-test="task-table-header" className="task-table__th">№</div>
        <SortableHeader className="task-table__th" name="summary">Summary</SortableHeader>
        <SortableHeader className="task-table__th" name="dueDate">Due date</SortableHeader>
        <SortableHeader className="task-table__th" name="authorId">Author</SortableHeader>
      </div>
      <div className="task-table__body">
        {tasks.map((task) => (<TaskRow key={task.id} task={task} />))}
      </div>
    </div>
  );
}

function SortableHeader({
  className,
  name,
  children,
}) {
  const dispatch = useDispatch();
  const sortBy = useSelector(sortingSelector);
  const isActive = sortBy[name];
  const classes = c(className, 'sortable-header', {'sortable-header--active': isActive});
  return (
    <div
      data-test="task-table-header"
      className={classes}
      onClick={onClickSetSorting}
    >
      {children}
    </div>
  );

  function onClickSetSorting() {
    if (isActive) {
      dispatch(setSorting({name, isActive: false}));
    } else {
      dispatch(setSorting({name, isActive: true}));
    }
  }
}

export default TaskTable;
