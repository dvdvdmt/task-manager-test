import React from 'react';
import {useSelector} from 'react-redux';
import {userSelector} from '../../utils/userSlice.js';

function UserProfile() {
  const {avatarUrl, fullName} = useSelector(userSelector);
  return (
    <div className="user-profile" data-test="user-profile">
      <img src={avatarUrl} alt="user avatar" className="user-profile__avatar" />
      <div className="user-profile__name">{fullName}</div>
    </div>
  );
}

export default UserProfile;
