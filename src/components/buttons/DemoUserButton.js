import React from 'react';
import styles from '../../css-modules/Login.module.css';

const DemoUserButton = () => {
  return (
    <button className={`${styles.button} ${styles.demoUserButton}`}>
      Continue as Demo User
    </button>
  );
};

export default DemoUserButton;
