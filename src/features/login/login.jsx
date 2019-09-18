import {navigate} from 'hookrouter';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as c from 'classnames';
import Button from '../../components/button/button.jsx';
import {login, userSelector} from '../../utils/userSlice.js';
import './login.scss';

function Login() {
  const dispatch = useDispatch();
  const {isAuthenticated, isLoading, logInError} = useSelector(userSelector);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">Authorization</div>
        <div className="login__message">Input your user name and password</div>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <input
              id="user-name"
              className="login__form-input"
              type="text"
              data-test="name"
              required
              onChange={handleChangeUserName}
            />
            <label htmlFor="user-name" className="login__form-label">User name</label>
          </div>
          <div className="login__form-group">
            <input
              id="password"
              className="login__form-input"
              type="password"
              data-test="password"
              required
              onChange={handleChangePassword}
            />
            <label htmlFor="password" className="login__form-label">Password</label>
          </div>
          <div className="login__form-group">
            <div className="login__remember-me">
              <input type="checkbox" id="remember-me" className="login__form-checkbox" />
              <label htmlFor="remember-me" className="login__form-label">Remember me</label>
            </div>
            <div className="login__forgot-password">Forgot your password?</div>
          </div>
          <div className={c('login__error', {'login__error--shake': !isLoading && logInError})}>{logInError}</div>
          <Button type="submit" dataTest="submit">Log In</Button>
        </form>
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(userName, password));
  }

  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
}

export default Login;
