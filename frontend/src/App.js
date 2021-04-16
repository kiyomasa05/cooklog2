import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Home } from './containers/static_page.jsx';
import { Login }  from './containers/Login.jsx';
import { Logout } from './containers/Logout.jsx';

function App() {
  return (
    <Router>
      <Switch>
        // ホーム
        <Route
          exact
          path="/">
          <Home />
        </Route>
        // ログインページ
        <Route
          exact
          path="/login"
        >
          <Login />
        </Route>
        // ログアウトページ
        <Route
          exact
          path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
