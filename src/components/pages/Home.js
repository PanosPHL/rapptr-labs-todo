import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LogoutButton } from '../buttons';
import { TaskForm } from '../forms';
import { Task } from '../misc';
import styles from '../../css-modules/Tasks.module.css';

const Home = ({ logout }) => {
  // Sets presentational state for new task form
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  // Store IDs to use in keys for map method
  const [idNum, setIdNum] = useState(0);
  const [search, setSearch] = useState('');

  // Load task state if it exists in localStorage
  useEffect(() => {
    const data = localStorage.getItem('taskState');

    if (data) {
      const { tasks, idNum } = JSON.parse(data);

      setIdNum(idNum);
      setTasks(tasks);
    }
  }, []);

  // Set task state in localStorage on update of id or tasks
  useEffect(() => {
    localStorage.setItem(
      'taskState',
      JSON.stringify({
        idNum,
        tasks,
      })
    );
  }, [idNum, tasks]);

  // Memoize functions to prevent rerenders of optimized child components
  const saveTask = useCallback(
    (e, type, task) => {
      e.preventDefault();

      if (type === 'new') {
        // Use previous state callbacks as React state does not update synchronously
        setTasks((tasks) => [...tasks, task]);
        setIdNum((prevState) => prevState + 1);
        setNewTask(false);
        return;
      }

      const index = tasks.findIndex((t) => t.id === task.id);
      setTasks((prevState) => [
        ...prevState.slice(0, index),
        task,
        ...prevState.slice(index + 1),
      ]);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (e, task) => {
      e.preventDefault();

      const index = tasks.findIndex((t) => t.id === task.id);
      setTasks((prevState) => [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ]);
    },
    [tasks]
  );

  return (
    <>
      <nav className="nav">
        <LogoutButton logout={logout} />
      </nav>
      <main className={styles.main}>
        <h1 className={styles.header}>My To-Do List</h1>
        <section className={styles.card}>
          <div className={styles.searchContainer}>
            <div style={{ position: 'relative' }}>
              <i
                className={styles.searchIcon + ' fa fa-search'}
                aria-hidden="true"
              ></i>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                name="search"
                className={styles.search}
                placeholder="Search"
              />
            </div>
            <button
              className={styles.taskButton}
              onClick={() =>
                !newTask ? setNewTask((newTask) => !newTask) : null
              }
            >
              New
            </button>
          </div>
          {newTask ? (
            <div className={styles.taskRow}>
              <TaskForm
                type="new"
                initText=""
                saveTask={saveTask}
                id={idNum + 1}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={styles.tasksContainer}>
            {tasks.length ? (
              tasks
                .filter(({ name }) => {
                  if (!search.length) {
                    return true;
                  }
                  // Create regex to match search string case-agnostic
                  const regex = new RegExp(search, 'i');

                  return regex.test(name);
                })
                .map(({ id, name }, i, arr) => (
                  <Task
                    key={id}
                    initText={name}
                    id={id}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                    noBorder={arr.length >= 7 && i === 0}
                  />
                ))
            ) : (
              <></>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home;
