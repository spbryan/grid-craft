/********************************
  * Home Page
  * Starting point with site information and user login
  * 
  * @author Sean Bryan
  * 
  * 2019-10-16
  ********************************/

import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import con from "../utils/const";
import './Home.css';

class Home extends Component {
    // state = {
    //     date: new Date(),
    //     teams: [],
    //     redirect: false,
    //     teamChosen: null,
    //     dropdownLabel: "Choose Team"
    // }

    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            this.props.updateWhichNav(con.LOGGED_OUT);
        } else {
            this.props.updateWhichNav(con.LOGGED_IN);
        }
    }

    render() {
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col size="md-12">
                            <h1>Home Page</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;