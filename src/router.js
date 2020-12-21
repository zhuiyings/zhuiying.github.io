import React from "react";
import { Router, Route, Switch } from "dva/router";
import Zby from "./routes/Zby";
import Top250 from "./routes/Douban/Top250";
import Hot from "./routes/Douban/Hot";
import My from "./routes/My";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/zby" component={Zby} exact />
        <Route path="/top250" component={Top250} exact />
        <Route path="/hot" component={Hot} exact />
        <Route path="/my" component={My} exact />
        <Route path="/" component={Zby} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
