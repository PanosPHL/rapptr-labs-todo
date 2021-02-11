import React, { useState } from 'react';
import capitalize from '../../../util/capitalize';
import styles from '../../../css-modules/Login.module.css';

const TextInput = ({
  value,
  setValue,
  type,
  placeholder,
  icon,
  validator,
  error,
  handleErrorChange,
  validSubmissionError,
}) => {
  const onChange = (e) => {
    if (!validator(e.target.value)) {
      handleErrorChange(type, 'set');
    } else {
      handleErrorChange(type, 'clear');
    }

    if (validSubmissionError) {
      handleErrorChange('validSubmission', 'clear');
    }

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
};

export default React.memo(TextInput);