import React from "react";
import { Router, Route, Switch } from "dva/router";
import CarZby from "./routes/Car/Zby";
import CarData from "./routes/Car/Data";
import DoubanTop from "./routes/Douban/Top";
import DoubanHot from "./routes/Douban/Hot";
import MyInfo from "./routes/My/Info";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/car/data" component={CarData} exact />
        <Route path="/car/zby" component={CarZby} exact />
        <Route path="/douban/top" component={DoubanTop} exact />
        <Route path="/douban/hot" component={DoubanHot} exact />
        <Route path="/my/info" component={MyInfo} exact />
        <Route path="/" component={DoubanHot} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
