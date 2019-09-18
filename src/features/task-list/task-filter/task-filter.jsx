import React, {useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fromEvent} from 'rxjs';
import * as c from 'classnames';
import './task-filter.scss';
// eslint-disable-next-line import/extensions
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import Button from '../../../components/button/button.jsx';
import {userSelector} from '../../../utils/userSlice.js';
import {createTask, setTaskFilter} from '../tasksSlice.js';

function TaskFilter({classes}) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {id: userId} = useSelector(userSelector);
  useLayoutEffect(() => {
    const {current} = inputRef;
    const onInput$ = fromEvent(current, 'input').pipe(
      map((e) => e.target.value),
      debounceTime(300),
      distinctUntilChanged(),
    );
    const subscription = onInput$.subscribe((text) => {
      dispatch(setTaskFilter(text));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className={c(classes, 'task-filter')}>
      <span className="task-filter__label">Tasks</span>
      <input className="task-filter__input" placeholder="Search by tasks" type="text" data-test="task-filter" ref={inputRef} />
      <Button classes="task-filter__create-task" dataTest="create-task" onClick={onClickCreateTask}>Create task</Button>
    </div>
  );

  function onClickCreateTask() {
    dispatch(createTask(userId));
  }
}

export default TaskFilter;
