import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import "./styles/main.css";
import Ingredients from "./components/Ingredients";

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Ingredients} />
            <Route path="/about" exact component={About} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
