import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/home" component={Home} exact />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
