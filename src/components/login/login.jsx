import React from 'react';

function Login() {
  return (
    <div className="login">
      <form className="login__form">
        <div className="login__form-group">
          <label htmlFor="user-name" className="login__label">User name</label>
          <input id="user-name" type="text" />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
