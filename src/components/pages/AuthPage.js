import React from 'react';
import PropTypes from 'prop-types';
import { LoginForm } from '../forms';
import { HorizontalRule } from '../universal';
import styles from '../../css-modules/Login.module.css';
import logo from '../../assets/rapptr_logo.png';
import logoText from '../../assets/rapptr_logo_text.png';
import { DemoUserButton } from '../buttons';

const AuthPage = ({ type, login }) => {
  return (
    <section className={styles.section + ' centered'}>
      <img src={logo} className={styles.logo} />
      <img src={logoText} className={styles.logoText} />
      <DemoUserButton login={login} />
      <HorizontalRule />
      {type === 'Login' ? <LoginForm login={login} /> : <></>}
    </section>
  );
};

AuthPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default AuthPage;
