import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './components/pages/Home';
import AuthPage from './components/pages/AuthPage';
import AuthRoute from './components/universal/AuthRoute';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem('user');

    if (data) {
      const { user } = JSON.parse(data);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ user }));
  }, [user]);

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

  const logout = () => {
    localStorage.clear();
    setUser(null);
    history.push('/login');
  };

  return (
    <div className="page-content">
      <Switch>
        <AuthRoute
          exact={true}
          path="/login"
          isLoggedIn={user && user.user_id ? true : false}
          render={() => (
            <AuthPage
              isLoggedIn={user && user.user_id ? true : false}
              type="Login"
              login={login}
            />
          )}
        />
        <AuthRoute
          isLoggedIn={user && user.user_id ? true : false}
          path="/"
          render={() => <Home logout={logout} />}
        />
      </Switch>
    </div>
  );
}

export default App;
