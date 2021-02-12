import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css-modules/Login.module.css';

const SubmitButton = ({ text, fetching, error }) => {
  return (
    <button
      className={
        `button ${styles.authButton}` +
        (fetching ? ` ${styles.fetching}` : '') +
        (error ? ' disabled' : '')
      }
      type="submit"
    >
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default React.memo(SubmitButton);
