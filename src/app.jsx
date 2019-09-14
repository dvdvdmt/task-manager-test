import {navigate, useRoutes} from 'hookrouter';
import ReactDOM from 'react-dom';
import React from 'react';
import styles_ from './app.scss';
import Login from './components/login/login.jsx';
import NotFound from './components/not-found/not-found.jsx';
import TaskList from './components/task-list/task-list.jsx';
import TaskView from './components/task-view/task-view.jsx';
import NavBar from './components/nav-bar/nav-bar.jsx';
import auth from './utils/auth.js';

const routes = {
  '/': () => <TaskList />,
  '/tasks': () => <TaskList />,
  '/tasks/:id': ({id}) => <TaskView id={id} />,
  '/login': () => <Login />,
};

function App() {
  if (!auth.isAuthenticated) {
    navigate('/login');
  }
  const routeResult = useRoutes(routes);
  return (
    <div className="app" data-test="app">
      <NavBar />
      {routeResult || <NotFound />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
