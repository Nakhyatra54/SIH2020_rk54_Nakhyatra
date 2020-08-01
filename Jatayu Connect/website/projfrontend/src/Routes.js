import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Database from "./components/Database";
import PrivateRoute from './api/PrivateRoutes'
import Sendsms from "./components/Sendsms";

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/database" exact component={Database} />
          <PrivateRoute path="/sendsms" exact component={Sendsms} />

        </Switch> 
      </BrowserRouter>
    );
  };
  
  export default Routes;