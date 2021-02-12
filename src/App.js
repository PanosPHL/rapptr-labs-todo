import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { AuthRoute } from './components/universal';
import Loading from './components/pages/Loading';

// Lazy loading to optimize performance
const Home = React.lazy(() => import('./components/pages/Home'));
const AuthPage = React.lazy(() => import('./components/pages/AuthPage'));

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Retrieve user from localStorage if it exists
  useEffect(() => {
    const data = localStorage.getItem('user');

    if (data) {
      const { user } = JSON.parse(data);
      setUser(user);
    }
  }, []);

  // Set user in localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ user }));
  }, [user]);

  // Memoize function to pass to optimized child components
  const login = useCallback(async (email, password) => {
    const res = await fetch(
      'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // Build query string
        body: [
          `email=${encodeURIComponent(email)}`,
          `password=${encodeURIComponent(password)}`,
        ].join('&'),
      }
    );

    // If successful login, redirect
    if (res.ok) {
      res.data = await res.json();
      setUser(res.data);
      history.push('/');
      return;
    }

    // Otherwise handle error in next function
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
