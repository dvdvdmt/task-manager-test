import {navigate} from 'hookrouter';
import React, {useState} from 'react';
import auth from '../../utils/auth.js';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-group">
          <label htmlFor="user-name" className="login__label">User name</label>
          <input id="user-name" type="text" data-test="name" onChange={handleChangeUserName} />
        </div>
        <div className="login__form-group">
          <label htmlFor="password" className="login__label">Password</label>
          <input id="password" type="password" data-test="password" onChange={handleChangePassword} />
        </div>
        <button type="submit" data-test="submit">Log In</button>
      </form>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await auth.login(userName, password);
    navigate('/');
  }

  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
}

export default Login;
