import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ isLoggedIn, path, component }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else {
    return <Route exact path={path} component={component} />;
  }
};

export default AuthRoute;