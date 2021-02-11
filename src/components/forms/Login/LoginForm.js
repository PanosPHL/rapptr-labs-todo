import React, { useState, useCallback, useReducer } from 'react';
import SubmitButton from '../inputs/SubmitButton';
import TextInput from '../inputs/TextInput';
import { validateEmail, validatePassword } from '../../../util/validations';
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_FETCHING,
  SET_ERROR,
  CLEAR_ERROR,
  CLEAR_ERRORS,
} from './constants';
import styles from '../../../css-modules/Login.module.css';

const initialState = {
  email: '',
  password: '',
  fetching: false,
  errors: {
    email: false,
    password: false,
    submit: false,
  },
};

function loginReducer(state, action) {
  const newState = Object.assign({}, state);
  let newErrors;
  switch (action.type) {
    case SET_EMAIL:
      newState.email = action.payload;
      return newState;
    case SET_PASSWORD:
      console.log(action);
      newState.password = action.payload;
      return newState;
    case SET_ERROR:
      newErrors = Object.assign({}, state.errors);
      newErrors[action.payload] = true;
      newState.errors = newErrors;
      return newState;
    case CLEAR_ERROR:
      newErrors = Object.assign({}, state.errors);
      newErrors[action.payload] = false;
      newState.errors = newErrors;
      return newState;
    case CLEAR_ERRORS:
      newState.errors = initialState.errors;
      return newState;
    case SET_FETCHING:
      newState.fetching = action.payload;
      return newState;
    default:
      return state;
  }
}

const LoginForm = () => {
  const [{ email, password, fetching, errors }, dispatch] = useReducer(
    loginReducer,
    initialState
  );

  const handleEmailChange = (email) => {
    dispatch({ type: SET_EMAIL, payload: email });
  };

  const handlePasswordChange = (password) => {
    dispatch({ type: SET_PASSWORD, payload: password });
  };

  const handleErrorChange = (field, type) => {
    dispatch({
      type: type === 'set' ? SET_ERROR : CLEAR_ERROR,
      payload: field,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: SET_FETCHING, payload: true });
  };

  return (
    <form onSubmit={onSubmit} className={'flex-column ' + styles.form}>
      <TextInput
        value={email}
        setValue={handleEmailChange}
        type="email"
        placeholder="user@rapptrlabs.com"
        icon="fa fa-user"
        validator={validateEmail}
        error={errors.email}
        handleErrorChange={handleErrorChange}
      />
      <TextInput
        value={password}
        setValue={handlePasswordChange}
        type="password"
        placeholder="Must be at least 4 characters"
        icon="fa fa-lock"
        validator={validatePassword}
        error={errors.password}
        handleErrorChange={handleErrorChange}
      />
      <SubmitButton
        text="Login"
        fetching={fetching}
        error={errors.email || errors.password}
      />{' '}
      {errors.submit ? (
        <span>The server could not be reached. Please try again later.</span>
      ) : (
        <></>
      )}
    </form>
  );
};

export default LoginForm;
