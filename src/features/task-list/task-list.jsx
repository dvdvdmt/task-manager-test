import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fromEvent} from 'rxjs';
// eslint-disable-next-line import/extensions
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import Loader from '../../components/loader.jsx';
import {fetchUsers, usersSelector} from '../../utils/usersSlice.js';
import TaskRow from './task-row/task-row.jsx';
import {fetchTasks, setTaskFilter, tasksSelector} from './tasksSlice.js';

export default function TaskList() {
  const dispatch = useDispatch();
  const {isLoading: isTasksLoading} = useSelector(tasksSelector);
  const {isLoading: isUsersLoading} = useSelector(usersSelector);
  const isLoading = isTasksLoading || isUsersLoading;
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div data-test="task-list">
      <TaskFilter />
      {
        isLoading
          ? <Loader />
          : <TaskTable />
      }
    </div>
  );
}

function TaskTable() {
  const {currentPageTasks: tasks} = useSelector(tasksSelector);
  return (
    <div className="task-list__table">
      {tasks.map((task) => (<TaskRow key={task.id} task={task} />))}
    </div>
  );
}

function TaskFilter() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const {current} = inputRef;
    const onInput$ = fromEvent(current, 'input').pipe(
      map((e) => e.target.value),
      // filter((text) => text.length > 2),
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
    <div>
      <input type="text" data-test="task-filter" ref={inputRef} />
    </div>
  );
}
