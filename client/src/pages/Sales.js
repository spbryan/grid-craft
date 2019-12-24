import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SalesTable from "../components/SalesTable";
import con from "../utils/const";
import API from "../utils/API";

class Sales extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            this.props.updateWhichNav(con.LOGGED_OUT);
        } else {
            this.props.updateWhichNav(con.LOGGED_IN);
        }
        this.setState({
            redirect: false
        })
        this.getSales();
    }

    state = {
        redirect: false,
        salesData: []
    };

    redirectLocation = '';

    /********************
     * API Router Calls
    ********************/
    getSales = () => {
        API.getSalesByUserId(sessionStorage.getItem("userID"))
            .then(res =>
                this.setState({
                    salesData: res.data
                })
            )
            .catch(err => {
                alert("Sales Page: get sales error: " + err);
                this.setState({
                    materialsData: []
                })
            });
    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: this.redirectLocation
            }} />)
        }
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col align="center">
                            <h1>Sales</h1>
                        </Col>
                    </Row>
                    <SalesTable data={this.state.salesData} />
                </Container>
            </div>
        );
    }
}

export default Sales;