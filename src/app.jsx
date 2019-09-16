import {navigate, useRoutes} from 'hookrouter';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import './app.scss';
import Login from './components/login/login.jsx';
import NavBar from './components/nav-bar/nav-bar.jsx';
import NotFound from './components/not-found/not-found.jsx';
import TaskList from './components/task-list/task-list.jsx';
import TaskView from './components/task-view/task-view.jsx';
import {authenticate} from './utils/authSlice.js';
import store from './utils/store.js';

const routes = {
  '/': () => <TaskList />,
  '/tasks': () => <TaskList />,
  '/tasks/:id': ({id}) => <TaskView id={id} />,
  '/login': () => <Login />,
};

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated, isLoading} = useSelector(({auth}) => auth);
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  if (!isLoading && !isAuthenticated) {
    navigate('/login');
  }
  const routeResult = useRoutes(routes);
  return isLoading
    ? (<>Loading...</>)
    : (
      <>
        <NavBar />
        {routeResult || <NotFound />}
      </>
    );
}

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app'),
);
