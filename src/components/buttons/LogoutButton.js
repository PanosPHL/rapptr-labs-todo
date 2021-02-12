import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css-modules/Tasks.module.css';

const LogoutButton = ({ logout }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <button className={`button ${styles.authButton}`} onClick={handleClick}>
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default React.memo(LogoutButton);
