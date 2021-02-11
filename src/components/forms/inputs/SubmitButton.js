import React from 'react';
import styles from '../../../css-modules/Login.module.css';

const SubmitButton = ({ text, fetching, error }) => {
  return (
    <button
      className={
        `${styles.button} ${styles.submitButton}` +
        (fetching ? ` ${styles.fetching}` : '') +
        (error ? ` ${styles.disabled}` : '')
      }
      type="submit"
    >
      {text}
    </button>
  );
};

export default React.memo(SubmitButton);
