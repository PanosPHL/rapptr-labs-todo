import React, { useState } from 'react';
import TaskForm from '../forms/Task/TaskForm';
import styles from '../../css-modules/Tasks.module.css';

const Task = ({ initText, id, saveTask, deleteTask, noBorder }) => {
  const [editTask, setEditTask] = useState(false);
  return (
    <div className={styles.taskRow + (noBorder ? ' no-border' : '')}>
      {!editTask ? (
        <>
          <span className={styles.taskName}>{initText}</span>
          <div className={styles.taskRowButtons}>
            <button
              className={styles.taskRowButton}
              onClick={() => setEditTask(true)}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              className={styles.taskRowButton}
              onClick={(e) => deleteTask(e, { id })}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </>
      ) : (
        <TaskForm
          type="edit"
          initText={initText}
          id={id}
          saveTask={saveTask}
          setEditTask={setEditTask}
        />
      )}
    </div>
  );
};

export default Task;