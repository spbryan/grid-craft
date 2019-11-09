/********************************
  * Navigation Bar with Login option
  * 
  * @author Sean Bryan
  * 
  * 2019-10-16
  ********************************/
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
// import './style.css';

class NavLogin extends Component {

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
        // this.props.updateWhichNav(con.NOUSER);
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
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} activeClassName="active" id="login" to="/loginscreen">
                        Sign-in/Sign-up
                    </NavLink>
                    {/* <NavLink onClick={this.handleLogOut} className="ml-auto" id="logout" to="/">
                        Logout for {this.props.devName}
                    </NavLink> */}
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default NavLogin;