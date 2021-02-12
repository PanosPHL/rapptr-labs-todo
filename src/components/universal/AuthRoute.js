import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ isLoggedIn, path, render, exact }) => {
  if (!isLoggedIn && path !== '/login') {
    return <Redirect to="/login" />;
  } else if (isLoggedIn && path === '/login') {
    return <Redirect to="/" />;
  } else {
    return <Route exact={exact} path={path} render={render} />;
  }
};

AuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};

export default AuthRoute;
