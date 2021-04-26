import React from "react";
import { Router, Route, Switch } from "dva/router";
import CarZby from "./routes/Car/Zby";
import CarData from "./routes/Car/Data";
import FilmTop from "./routes/Film/Top";
import FilmHot from "./routes/Film/Hot";
import MyInfo from "./routes/My/Info";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/car/data" component={CarData} exact />
        <Route path="/car/zby" component={CarZby} exact />
        <Route path="/film/top" component={FilmTop} exact />
        <Route path="/film/hot" component={FilmHot} exact />
        <Route path="/my/info" component={MyInfo} exact />
        <Route path="/" component={CarZby} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
