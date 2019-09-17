import React from 'react';
import PropTypes from 'prop-types';

function TaskRow({task}) {
  return (
    <div data-test="task-row">
      <div data-test="task-id">{task.id}</div>
      <div data-test="task-summary">{task.summary}</div>
      <div data-test="task-due-date">{task.dueDate}</div>
      <div data-test="task-author">{task.authorId}</div>
    </div>
  );
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default TaskRow;
