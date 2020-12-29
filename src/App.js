import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
        </Switch>
        <Switch>
          <Route exact path="/chat/:room/:username" component={Chat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
