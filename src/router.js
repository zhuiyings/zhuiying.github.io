import React from "react";
import { Router, Route, Switch } from "dva/router";
import Zby from "./routes/Zby";
import Douban from "./routes/Douban";
import My from "./routes/My"

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/zby" component={Zby} exact />
        <Route path="/douban" component={Douban} exact />
        <Route path="/my" component={My} exact />
        <Route path="/" component={Zby} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
