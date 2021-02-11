import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ isLoggedIn, path, component }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else if (isLoggedIn && path == '/') {
    return {
      component,
    };
  } else {
    return <Route exact path={path} component={component} />;
  }
};

export default AuthRoute;
