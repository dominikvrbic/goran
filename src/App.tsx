import React from 'react';
import './App.css';
import { User } from './pages/User';
import { Users } from './pages/Users';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
