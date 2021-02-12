import React from 'react';
import styles from '../../css-modules/Tasks.module.css';

const LogoutButton = ({ logout }) => {
  return (
    <button className={`button ${styles.authButton}`} onClick={() => logout()}>
      Logout
    </button>
  );
};

export default LogoutButton;
