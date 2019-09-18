/* eslint-disable react/button-has-type */
import * as c from 'classnames';
import React from 'react';
import './button.scss';

export default function Button({
  children,
  disabled,
  classes,
  type = 'button',
  dataTest,
  onClick,
}) {
  return (
    <button
      type={type}
      data-test={dataTest}
      className={c(classes, 'button', 'button--primary')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
