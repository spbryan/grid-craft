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
import ProductsTable from "../components/ProductsTable";
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
        productsData: [],
        nextProductNumber: 1
    };

    redirectLocation = '';

    handleOpenForm = event => {
        event.preventDefault(); this.redirectLocation = '/productInput';
        this.determineNextProductNumber();
        this.setState({ redirect: true });  // causes a re-render so put it last
    };

    determineNextProductNumber = () => {
        var nextHighest = 1;
        this.state.productsData.forEach(element => {
            if (nextHighest <= element.productNumber) {
                nextHighest = element.productNumber + 1;
            }
        });
        this.setState({ nextProductNumber: nextHighest });
    }

    /********************
    * API Router Calls
    ********************/
    getInventory = () => {
        API.getProductsByUserId(sessionStorage.getItem("userID"))
            .then(res =>
                this.setState({
                    productsData: res.data
                })
            )
            .catch(err => {
                alert("Inventory Page: get products error: " + err);
                this.setState({
                    productsData: []
                })
            });
    };

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.redirectLocation} />;
        // }
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: this.redirectLocation,
                state: { productNumber: this.state.nextProductNumber }
            }} />)
        }
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col align="center">
                            <h1>Inventory</h1>
                        </Col>
                    </Row>
                    <ProductsTable data={this.state.productsData} />
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