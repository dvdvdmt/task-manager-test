import React from 'react';
import TaskRow from './task-row/task-row.jsx';

export default function TaskList() {
  const tasks = [
    'task 1', 'task 2', 'task 3',
  ];
  return (
    <div data-test="task-list">
      {tasks.map((task) => (<TaskRow text={task} />))}
    </div>
  );
}
