import React, { useState, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './components/pages/Home';
import AuthPage from './components/pages/AuthPage';
import AuthRoute from './components/universal/AuthRoute';

function App() {
  const [user, setUser] = useState(false);
  const history = useHistory();

  const login = useCallback(async (email, password) => {
    const res = await fetch(
      'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: [
          `email=${encodeURIComponent(email)}`,
          `password=${encodeURIComponent(password)}`,
        ].join('&'),
      }
    );

    if (res.ok) {
      res.data = await res.json();
      setUser(res.data);
      history.push('/');
      return;
    }

    return res;
  }, []);

  return (
    <div className="page-content">
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <AuthPage type="Login" login={login} />}
        />
        <AuthRoute
          isLoggedIn={user && user.user_id ? user.user_id : null}
          path="/"
          component={Home}
        />
      </Switch>
    </div>
  );
}

export default App;
