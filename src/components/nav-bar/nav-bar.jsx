import * as c from 'classnames';
import {A} from 'hookrouter';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {logout, userSelector} from '../../utils/userSlice.js';
import './nav-bar.scss';

export default function NavBar() {
  const {isAuthenticated, avatarUrl, fullName} = useSelector(userSelector);
  const currentDate = moment();
  const dayOfWeek = currentDate.format('dddd');
  const longDate = currentDate.format('D MMMM, YYYY');
  return (
    <nav className="nav-bar">
      <A href="/">
        <img
          className="nav-bar__logo"
          src="/assets/icons/brand-logo.svg"
          alt="brand logo"
          width="60"
          height="60"
        />
      </A>
      <div className="nav-bar__date">
        <div className="nav-bar__day-of-week">{dayOfWeek}</div>
        <div className="nav-bar__long-date">{longDate}</div>
      </div>
      <UserBar classes="nav-bar__user-bar" isVisible={isAuthenticated} avatarUrl={avatarUrl} fullName={fullName} />
    </nav>
  );
}

function UserBar({
  isVisible, avatarUrl, fullName, classes,
}) {
  if (!isVisible) {
    return '';
  }
  const avatarStyle = {
    backgroundImage: `url(${avatarUrl})`,
  };
  return (
    <div className={c(classes, 'user-bar')}>
      <A href="/me" className="user-bar__profile-link" data-test="profile-link">
        <div className="user-bar__avatar" style={avatarStyle} />
        <div className="user-bar__name">{fullName}</div>
      </A>
      <LogOutBtn classes="user-bar__logout" />
    </div>
  );
}

function LogOutBtn({classes}) {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className={c(classes, 'secondary-btn secondary-btn--min')}
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
