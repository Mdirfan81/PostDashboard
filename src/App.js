import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./component/Dashboard";

import { Provider } from "react-redux";
import store from "./features/store";
import PageNotFound from "./component/PageNotFound";

import MainPage from "./component/MainPage";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
