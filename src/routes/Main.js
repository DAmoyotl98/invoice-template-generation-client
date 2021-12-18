import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Invoice from "../components/Invoice";

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path="/invoice/:id"><Invoice></Invoice></Route>
        <Route  path="/"><Invoice></Invoice></Route>
      </Switch>
    </Router>
  );
};

export default Main;
