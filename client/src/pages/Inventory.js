/********************************
  * Page to inventory products
  * 
  * @author Sean Bryan
  * 
  * 2019-11-18
  ********************************/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import InventoryTable from "../components/InventoryTable";
import con from "../utils/const";
import API from "../utils/API";
import './Inventory.css';

class Inventory extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            this.props.updateWhichNav(con.LOGGED_OUT);
        } else {
            this.props.updateWhichNav(con.LOGGED_IN);
        }
        this.setState({
            redirect: false
        })
        this.getInventory();
    }

    state = {
        redirect: false,
        inventoryData: []
    };

    redirectLocation = '';

    handleOpenForm = event => {
        event.preventDefault(); this.redirectLocation = '/productInput';
        this.setState({ redirect: true });  // causes a re-render so put it last
    };

    /********************
    * API Router Calls
    ********************/
    getInventory = () => {
        API.getProductsByUserId(sessionStorage.getItem("userID"))
            .then(res =>
                this.setState({
                    inventoryData: res.data
                })
            )
            .catch(err => {
                alert("Inventory Page: get products error: " + err);
                this.setState({
                    inventoryData: []
                })
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.redirectLocation} />;
        }
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col align="center">
                            <h1>Inventory</h1>
                        </Col>
                    </Row>
                    <InventoryTable data={this.state.inventoryData} />
                    <Row>
                        <Col align="right">
                            <Button
                                type="button"
                                className="new-btn ml-4"
                                onClick={this.handleOpenForm}>Add Product</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Inventory;