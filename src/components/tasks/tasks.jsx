import PropTypes from 'prop-types';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../not-found/not-found.jsx';
import TaskList from './task-list/task-list.jsx';
import TaskView from './task-view/task-view.jsx';

function Tasks({match}) {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}`} component={TaskList} />
        <Route exact path={`${match.path}/:id`} component={TaskView} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

Tasks.propTypes = {
  match: PropTypes.shape({path: PropTypes.string.isRequired}).isRequired,
};

export default Tasks;
