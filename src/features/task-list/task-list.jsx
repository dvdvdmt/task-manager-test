import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fromEvent} from 'rxjs';
// eslint-disable-next-line import/extensions
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import Loader from '../../components/loader.jsx';
import {userSelector} from '../../utils/userSlice.js';
import {fetchUsers, usersSelector} from '../../utils/usersSlice.js';
import TaskRow from './task-row/task-row.jsx';
import {
  createTask, fetchTasks, setTaskFilter, tasksSelector,
} from './tasksSlice.js';

export default function TaskList() {
  const dispatch = useDispatch();
  const {isLoading: isTasksLoading} = useSelector(tasksSelector);
  const {isLoading: isUsersLoading} = useSelector(usersSelector);
  const {id: userId} = useSelector(userSelector);
  const isLoading = isTasksLoading || isUsersLoading;
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div data-test="task-list">
      <div className="task-list__filter-block">
        <TaskFilter />
        <button type="button" data-test="create-task" onClick={onClickCreateTask}>Create task</button>
      </div>
      {
        isLoading
          ? <Loader />
          : <TaskTable />
      }
    </div>
  );

  function onClickCreateTask() {
    dispatch(createTask(userId));
  }
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
    <input type="text" data-test="task-filter" ref={inputRef} />
  );
}
