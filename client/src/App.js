/********************************
  * App.js for MatchiMo
  * 
  * @author Sean Bryan
  * 
  * 2019-10-16
  ********************************/

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
// import logo from "./logo.svg";
import Navigation from "./components/Navigation";
import NavLogin from "./components/NavLogin";
import MaterialInput from "./components/MaterialInput";
import ProductInput from "./components/ProductInput";
import LoginScreen from "./pages/LoginScreen";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Material from "./pages/Material";
import Product from "./pages/Product";
import Materials from "./pages/Materials";
import Sales from "./pages/Sales";
import Sale from "./pages/Sale";
import con from "./utils/const";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.updateWhichNav = this.updateWhichNav.bind(this);

    // Set some state
    this.state = {
      whichNav: 1
    };
  }

  // pass this function to the components to tell app which nav bar to load
  updateWhichNav = navType => {
    if (navType === con.LOGGED_OUT) {
      this.setState({
        whichNav: con.LOGGED_OUT,
      });
    }
    else {
      this.setState({
        whichNav: con.LOGGED_IN,
      });
    }
  }

  switchOnLogin = () => {
    switch (this.state.whichNav) {
      default:
      case con.LOGGED_OUT:
        return <NavLogin />
      case con.LOGGED_IN:
        return <Navigation updateWhichNav={this.updateWhichNav}/>
      }
  }

  render() {
    return (
      <Router>
        <div>
          {this.switchOnLogin()}
          <Container id="body">
            <Route exact path="/loginscreen" component={LoginScreen} />
            <Route exact path="/" render={() => <Home updateWhichNav={this.updateWhichNav} />} />
            <Route exact path="/inventory" render={() => <Inventory updateWhichNav={this.updateWhichNav}/>} />
            <Route exact path="/sales" render={() => <Sales updateWhichNav={this.updateWhichNav}/>} />
            <Route exact path="/sale" render={(props) => <Sale {...props}/>}/>
            <Route exact path="/materials" render={() => <Materials updateWhichNav={this.updateWhichNav}/>} />
            <Route exact path="/materialInput" render={(props) => <MaterialInput {...props} updateWhichNav={this.updateWhichNav}/>} />
            <Route exact path="/material" render={(props) => <Material {...props}/>}/>
            <Route exact path="/product" render={(props) => <Product {...props}/>}/>
            <Route exact path="/productInput" render={(props) => <ProductInput {...props} updateWhichNav={this.updateWhichNav}/>} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
