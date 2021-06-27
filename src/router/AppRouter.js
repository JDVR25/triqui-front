import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {Home} from '../pages/home/Home';
import {Login} from '../pages/login/login';
import {Navbar} from '../components/nav/Navbar';
import {LocalMatch} from '../pages/localMatch/localMatch';
import {RemoteMatch} from '../pages/remoteMatch/remoteMatch';

export const AppRouter = () => {
  return(
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/local_Match">
          <LocalMatch/>
        </Route>
        <Route exact path="/remote_Match">
          <RemoteMatch/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  )
}