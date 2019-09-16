import {navigate, useRoutes} from 'hookrouter';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import './app.scss';
import Login from './features/login/login.jsx';
import NavBar from './features/nav-bar/nav-bar.jsx';
import NotFound from './features/not-found/not-found.jsx';
import TaskList from './features/task-list/task-list.jsx';
import TaskView from './features/task-view/task-view.jsx';
import UserProfile from './features/user-profile/user-profile.jsx';
import store from './utils/store.js';
import {authenticate, userSelector} from './utils/userSlice.js';

const routes = {
  '/': () => <TaskList />,
  '/tasks': () => <TaskList />,
  '/tasks/:id': ({id}) => <TaskView id={id} />,
  '/login': () => <Login />,
  '/me': () => <UserProfile />,
};

function App() {
  const dispatch = useDispatch();
  const {isLogInNeeded, isFirstLoad} = useSelector(userSelector);
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  if (isLogInNeeded) {
    navigate('/login');
  }
  const routeResult = useRoutes(routes);
  return isFirstLoad
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
