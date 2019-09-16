import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout, userSelector} from '../../utils/userSlice.js';

function LogOut({isVisible}) {
  const dispatch = useDispatch();
  if (!isVisible) {
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
  const {isAuthenticated} = useSelector(userSelector);
  return (
    <nav className="nav-bar">
      <div className="brand-logo">🗄</div>
      <div className="user-avatar">🌚</div>
      <div className="user-name">Creepy Moon</div>
      <LogOut isVisible={isAuthenticated} />
    </nav>
  );
}
