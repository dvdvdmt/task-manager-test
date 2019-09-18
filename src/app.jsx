import {navigate, useRoutes} from 'hookrouter';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import './app.scss';
import NavBar from './components/nav-bar/nav-bar.jsx';
import ProgressSpinner from './components/progress-spinner/progress-spinner.jsx';
import SideBar from './components/side-bar/side-bar.jsx';
import Login from './features/login/login.jsx';
import NotFound from './features/not-found/not-found.jsx';
import TaskList from './features/task-list/task-list.jsx';
import TaskView from './features/task-view/task-view.jsx';
import UserProfile from './features/user-profile/user-profile.jsx';
import store from './utils/store.js';
import {authenticate, userSelector} from './utils/userSlice.js';

const routes = {
  '/': () => <TaskList />,
  '/tasks': () => <TaskList />,
  '/tasks/:id': ({id}) => <TaskView taskId={id} />,
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
    ? (<ProgressSpinner />)
    : (
      <>
        {isLogInNeeded ? '' : <NavBar />}
        <div className="app__content">
          {isLogInNeeded ? '' : <SideBar />}
          <div className="app__page">
            {routeResult || <NotFound />}
          </div>
        </div>
      </>
    );
}

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app'),
);
