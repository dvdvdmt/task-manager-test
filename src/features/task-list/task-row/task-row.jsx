import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {A} from 'hookrouter';
import {userByIdSelector} from '../../../utils/usersSlice.js';

function TaskRow({task}) {
  const author = useSelector(userByIdSelector(task.authorId));
  return (
    <A href={`tasks/${task.id}`} data-test="task-row">
      <div data-test="task-id">{task.id}</div>
      <div data-test="task-summary">{task.summary}</div>
      <div data-test="task-due-date">{task.dueDate}</div>
      <Author author={author} />
    </A>
  );
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

function Author({author: {avatarUrl, fullName}}) {
  return (
    <div data-test="task-author">
      <img data-test="author-avatar" alt="author avatar" src={avatarUrl} />
      <div data-test="author-name">
        {fullName}
      </div>
    </div>
  );
}

export default TaskRow;
