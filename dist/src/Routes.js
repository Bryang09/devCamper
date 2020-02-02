import React from "react";

import { Switch, Route } from "react-router-dom";

import Landing from "./Components/Landing/Landing";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};

export default Routes;
