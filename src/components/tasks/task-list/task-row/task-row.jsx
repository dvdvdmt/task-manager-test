import React from 'react';
import PropTypes from 'prop-types';

function TaskRow({text}) {
  return (
    <div data-test="task-row">
      {text}
    </div>
  );
}

TaskRow.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TaskRow;
