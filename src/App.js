import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';

import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe("pk_test_51I2DLUAziYXgPMYAuYtt72fCCnQUalRxUYqLvF3SNdaaoo7wAl3t7wytMMPm4mngYayWrnQjnK7fiDH1LE7LL0hf00ihkb8gHX");

function App() {
  const [{ }, dispatch] = useStateValue();

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
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
