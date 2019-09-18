import * as c from 'classnames';
import React from 'react';
import {A} from 'hookrouter';
import './side-bar.scss';

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-bar__item">Templates</div>
      <div className="side-bar__item">Plans</div>
      <div className="side-bar__item">Invoices</div>
      <div className="side-bar__item">Analytics</div>
      <A href="/tasks" className={c('side-bar__item', {'side-bar__item--active': true})}>Tasks</A>
      <div className="side-bar__item">Leads</div>
    </div>
  );
}

export default SideBar;
