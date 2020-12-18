import React from "react";
import { Router, Route, Switch } from "dva/router";
import Root from "./routes/Root";
import Zby from "./routes/zby/Zby";
import Douban from "./routes/douban/Douban";
import Mail from "./routes/mail/Mail";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/zby" component={Zby} exact />
        <Route path="/douban" component={Douban} exact />
        <Route path="/mail" component={Mail} exact />
        <Route path="/" component={Zby} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
