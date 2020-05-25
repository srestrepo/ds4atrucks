import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
