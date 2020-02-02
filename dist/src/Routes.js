import React from "react";

import { Switch, Route } from "react-router-dom";

import Landing from "./Components/Landing/Landing";
import MemberHome from "./Components/MemberHome/MemberHome";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/member/home" component={MemberHome} />
    </Switch>
  );
};

export default Routes;
