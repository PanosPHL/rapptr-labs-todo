import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css-modules/Login.module.css';

const DemoUserButton = ({ login }) => {
  const handleClick = async () => {
    const res = await login('test@rapptrlabs.com', 'Test123');
  };

  return (
    <button onClick={handleClick} className={`button ${styles.demoUserButton}`}>
      Continue as Demo User
    </button>
  );
};

DemoUserButton.propTypes = {
  login: PropTypes.func.isRequired,
};

export default React.memo(DemoUserButton);
