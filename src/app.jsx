import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styles_ from './app.scss';
import Login from './components/login/login.jsx';
import NotFound from './components/not-found/not-found.jsx';
import Tasks from './components/tasks/tasks.jsx';
import NavBar from './components/nav-bar/nav-bar.jsx';

function App() {
  return (
    <Router>
      <div className="app" data-test="app">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Tasks} />
          <Route exact path="/login" component={Login} />
          <Route path="/tasks" component={Tasks} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
