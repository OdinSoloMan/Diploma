import React, { Component } from "react";
import JumbotronComponents from "./components/JumbotronComponents";
import NavbarComponents from "./components/NavbarComponents";
import { BrowserRouter, Route } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import DetailUserContainer from "./containers/DetailUserContainer";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponents />
        <JumbotronComponents />
        <BrowserRouter>
        <Route path="/" exact component={HomeContainer}/>
          <Route path="/create" exact component={CreateUserContainer}/>
          <Route path="/detail/:guidId" exact component={DetailUserContainer}/>
          <Route path="/edit/:guidId" exact component={EditUserContainer}/>
        </BrowserRouter>
      </div>
    );
  }
}
