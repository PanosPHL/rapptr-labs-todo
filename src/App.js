import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AuthPage from './components/pages/AuthPage';
import AuthRoute from './components/universal/AuthRoute';

function App() {
  return (
    <div className="page-content">
      <Router>
        <Switch>
          <Route exact path="/login" render={() => <AuthPage type="Login" />} />
          <AuthRoute path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
