/********************************
  * Main Navigation bar
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import con from "../../utils/const";
// import './style.css';

class Navigation extends Component {

    state = {
        open: false,
        width: window.innerWidth
    };

    // called when logout button is selected
    // this clears the session storage which is
    // what we use to indicate a user is logged in
    handleLogOut = props => {
        console.log(sessionStorage)
        sessionStorage.clear();
        this.props.updateWhichNav(con.LOGGED_OUT);
    }

    updateWidth = () => {
        const newState = { width: window.innerWidth };

        if (this.state.open && newState.width < 991) {
            newState.open = false
        }

        this.setState(newState);
    };

    toggleNav = () => {
        this.setState({ open: !this.state.open });
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="home" to="/">
                        Home
                    </NavLink>
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="inventory" to="/inventory">
                        Inventory
                    </NavLink>
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="sales" to="/sales">
                        Sales
                    </NavLink>
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="materials" to="/materials">
                        Materials
                    </NavLink>
                    <NavLink onClick={this.handleLogOut} className="ml-auto" id="logout" to="/">
                        Log Out
                    </NavLink>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default Navigation;