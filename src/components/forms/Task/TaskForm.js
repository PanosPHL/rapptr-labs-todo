import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { validateTask } from '../../../util/validations';
import styles from '../../../css-modules/Tasks.module.css';

const TaskForm = ({ type, initText, id, saveTask, setEditTask }) => {
  // Initially set taskName to specified task
  const [taskName, setTaskName] = useState(type === 'edit' ? initText : '');
  const [error, setError] = useState(false);
  const inputRef = useRef();

  // Auto-focus input on render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // Prevent submission with errors or no text
    if (error || !taskName.length) {
      return;
    }

    // Dispatch saving task to tasks state
    saveTask(e, type, { id, name: taskName });

    if (type === 'edit') {
      setEditTask(false);
    }
  };

  const onChange = (e) => {
    // Check and set errors
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
          name={type === 'edit' ? `edit-task-${id}` : 'new-task-form'}
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

TaskForm.propTypes = {
  type: PropTypes.string.isRequired,
  initText: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  saveTask: PropTypes.func.isRequired,
  setEditTask: PropTypes.func,
};

export default TaskForm;
