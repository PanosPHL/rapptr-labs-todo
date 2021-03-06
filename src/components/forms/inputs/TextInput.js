import React, { useState } from 'react';
import PropTypes from 'prop-types';
import capitalize from '../../../util/capitalize';
import styles from '../../../css-modules/Login.module.css';

const TextInput = React.forwardRef(
  (
    {
      value,
      setValue,
      type,
      placeholder,
      icon,
      validator,
      error,
      handleErrorChange,
      validSubmissionError,
    },
    ref
  ) => {
    const onChange = (e) => {
      // Check if valid input, set error accordingly
      if (!validator(e.target.value)) {
        handleErrorChange(type, 'set');
      } else {
        handleErrorChange(type, 'clear');
      }

      // If submission error, clear it on input change
      if (validSubmissionError) {
        handleErrorChange('validSubmission', 'clear');
      }

      // Set text value
      setValue(e.target.value);
    };

    return (
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor={type}>
          {capitalize(type)}
        </label>
        <div className={styles.textInputContainer}>
          <i className={`${icon} ${styles.inputIcon}`} aria-hidden="true"></i>
          <input
            className={styles.input + (error ? ` ${styles.error}` : '')}
            type={type === 'password' || type === 'email' ? type : 'text'}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            name={type}
            ref={ref}
          />
          {error ? (
            <p className={`${styles.errorText} ${styles[type + 'Error']}`}>
              {type === 'email'
                ? 'Not a valid email'
                : 'A password must be between 4 and 16 characters'}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  validator: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
  validSubmissionError: PropTypes.bool.isRequired,
};

export default React.memo(TextInput);
