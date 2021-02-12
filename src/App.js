import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { AuthRoute } from './components/universal';
import Loading from './components/pages/Loading';

const Home = React.lazy(() => import('./components/pages/Home'));
const AuthPage = React.lazy(() => import('./components/pages/AuthPage'));

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
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

export default App;
