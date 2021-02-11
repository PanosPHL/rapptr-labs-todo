import React from 'react';
import LoginForm from '../forms/Login/LoginForm';
import HorizontalRule from '../universal/HorizontalRule';
import Button from '../buttons/DemoUserButton';
import styles from '../../css-modules/Login.module.css';
import logo from '../../assets/rapptr_logo.png';
import logoText from '../../assets/rapptr_logo_text.png';
import DemoUserButton from '../buttons/DemoUserButton';

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

export default AuthPage;
