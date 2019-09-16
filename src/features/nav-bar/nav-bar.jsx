import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {A} from 'hookrouter';
import {logout, userSelector} from '../../utils/userSlice.js';

function UserBar({isVisible, avatarUrl, fullName}) {
  if (!isVisible) {
    return '';
  }
  return (
    <div className="user-bar">
      <A href="/me" className="user-bar__profile-link" data-test="profile-link">
        <div className="user-bar__avatar"><img src={avatarUrl} alt="User avatar" /></div>
        <div className="user-bar__name">{fullName}</div>
      </A>
      <LogOutBtn />
    </div>
  );
}

function LogOutBtn() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="logout-btn"
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
  const {isAuthenticated, avatarUrl, fullName} = useSelector(userSelector);
  return (
    <nav className="nav-bar">
      <div className="brand-logo">🗄</div>
      <UserBar isVisible={isAuthenticated} avatarUrl={avatarUrl} fullName={fullName} />
    </nav>
  );
}
