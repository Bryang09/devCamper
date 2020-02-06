import React from "react";

import { Switch, Route } from "react-router-dom";

import Landing from "./Components/Landing/Landing";
import MemberHome from "./Components/MemberHome/MemberHome";
import MemberProfile from "./Components/MemberProfile/MemberProfile";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/member/home" component={MemberHome} />
      <Route exact path="/member/profile" component={MemberProfile} />
    </Switch>
  );
};

export default Routes;
