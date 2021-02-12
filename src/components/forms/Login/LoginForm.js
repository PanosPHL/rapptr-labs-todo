import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { SubmitButton } from '../../buttons';
import { TextInput } from '../inputs';
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
    validSubmission: false,
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

const LoginForm = ({ login }) => {
  const [{ email, password, fetching, errors }, dispatch] = useReducer(
    loginReducer,
    initialState
  );
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleEmailChange = useCallback((email) => {
    dispatch({ type: SET_EMAIL, payload: email });
  }, []);

  const handlePasswordChange = useCallback((password) => {
    dispatch({ type: SET_PASSWORD, payload: password });
  }, []);

  const handleErrorChange = useCallback((field, type) => {
    dispatch({
      type: type === 'set' ? SET_ERROR : CLEAR_ERROR,
      payload: field,
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      return;
    }

    dispatch({ type: SET_FETCHING, payload: true });

    const res = await login(email, password);

    dispatch({ type: SET_FETCHING, payload: false });

    if (res.status >= 500) {
      dispatch({ type: SET_ERROR, payload: 'submit' });
      return;
    } else {
      dispatch({ type: SET_ERROR, payload: 'validSubmission' });
      return;
    }
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
        validSubmissionError={errors.validSubmission}
        ref={emailRef}
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
        validSubmissionError={errors.validSubmission}
      />
      <div style={{ position: 'relative', width: '100%' }}>
        <SubmitButton
          text="Login"
          fetching={fetching}
          error={errors.email || errors.password}
        />{' '}
        {errors.submit || errors.validSubmission ? (
          <p
            className={`${styles.errorText} ${
              errors.submit ? styles.submitError : styles.validSubmissionError
            }`}
          >
            {errors.submit
              ? 'The server could not be reached. Please try again later.'
              : 'Invalid credentials'}
          </p>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
