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
}) => {
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
          onChange={(e) => {
            if (!validator(e.target.value)) {
              handleErrorChange(type, 'set');
            } else {
              handleErrorChange(type, 'clear');
            }
            setValue(e.target.value);
          }}
          placeholder={placeholder}
        />
        {error ? (
          <span className={`${styles.errorText} ${styles[type + 'Error']}`}>
            {type === 'email'
              ? 'Not a valid email'
              : 'A password must be between 4 and 16 characters'}
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TextInput;
