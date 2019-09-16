import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../utils/authSlice.js';

function LogOut({isAuthenticated}) {
  const dispatch = useDispatch();
  if (!isAuthenticated) {
    return '';
  }
  return (
    <button
      type="button"
      className="logout"
      data-test="logout"
      onClick={onClickLogout}
    >
      Logout
    </button>
  );

  function onClickLogout() {
    dispatch(logout());
  }
}

export default function NavBar() {
  const {isAuthenticated} = useSelector(({auth}) => auth);
  return (
    <nav className="nav-bar">
      <div className="brand-logo">🗄</div>
      <div className="user-avatar">🌚</div>
      <div className="user-name">Creepy Moon</div>
      <LogOut isAuthenticated={isAuthenticated} />
    </nav>
  );
}
