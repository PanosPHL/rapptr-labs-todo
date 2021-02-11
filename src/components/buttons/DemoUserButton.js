import React from 'react';
import styles from '../../css-modules/Login.module.css';

const DemoUserButton = ({ login }) => {
  const handleClick = async () => {
    const res = await login('test@rapptrlabs.com', 'Test123');
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${styles.demoUserButton}`}
    >
      Continue as Demo User
    </button>
  );
};

export default React.memo(DemoUserButton);
