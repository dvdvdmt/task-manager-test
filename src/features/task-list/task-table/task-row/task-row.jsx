import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import './task-row.scss';
import {useSelector} from 'react-redux';
import {A} from 'hookrouter';
import {userByIdSelector} from '../../../../utils/usersSlice.js';

function TaskRow({task}) {
  const author = useSelector(userByIdSelector(task.authorId));
  const dueDate = moment(task.dueDate).format('D MMMM, HH:mm');
  return (
    <A href={`tasks/${task.id}`} data-test="task-row" className="task-table__row task-row">
      <div data-test="task-id" className="task-table__td">{task.id}</div>
      <div data-test="task-summary" className="task-table__td">{task.summary}</div>
      <div data-test="task-due-date" className="task-table__td">{dueDate}</div>
      <TaskAuthor author={author} />
    </A>
  );
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

function TaskAuthor({author: {avatarUrl, fullName}}) {
  const imageStyle = {
    backgroundImage: `url(${avatarUrl})`,
  };
  return (
    <div data-test="task-author" className="task-table__td task-author">
      <div data-test="author-avatar" className="task-author__avatar" style={imageStyle} />
      <div data-test="author-name" className="task-author__name">
        {fullName}
      </div>
    </div>
  );
}

export default TaskRow;
