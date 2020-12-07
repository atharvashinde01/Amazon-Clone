import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // It will only run once when the app component loads

    auth.onAuthStateChanged((authUser) => {
      console.log("The User is >>>", authUser);

      if (authUser) {
        // The user just logged in/ the user was logged out
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      }
      else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });

  }, []);

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
