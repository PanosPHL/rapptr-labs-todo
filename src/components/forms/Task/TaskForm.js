import React, { useEffect, useState, useRef } from 'react';
import { validateTask } from '../../../util/validations';
import styles from '../../../css-modules/Tasks.module.css';

const TaskForm = ({ type, initText, id, saveTask, setEditTask }) => {
  const [taskName, setTaskName] = useState(type === 'edit' ? initText : '');
  const [error, setError] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (error || !taskName.length) {
      return;
    }

    saveTask(e, type, { id, name: taskName });

    if (type === 'edit') {
      setEditTask(false);
    }
  };

  const onChange = (e) => {
    const validTask = validateTask(e.target.value);
    if (!validTask) {
      setError(true);
    } else if (validTask && error) {
      setError(false);
    }

    setTaskName(e.target.value);
  };

  return (
    <>
      <form className={styles.taskForm} onSubmit={onSubmit}>
        <input
          value={taskName}
          onChange={onChange}
          name={`edit-task-${taskName}`}
          className={styles.editTask}
          ref={inputRef}
        />
        <button
          className={
            `${styles.taskButton} ${styles.editSaveButton}` +
            (error || !taskName.length ? ' disabled' : '')
          }
          type="submit"
        >
          Save
        </button>
      </form>
      {error ? (
        <p className={styles.taskError}>
          Tasks must be between 1 and 25 characters
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskForm;
