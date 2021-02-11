import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ isLoggedIn, path, component }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};

AuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
