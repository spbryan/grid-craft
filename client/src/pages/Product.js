/********************************
  * Page with the product-specific details
  * 
  * @author Sean Bryan
  * 
  * 2019-11-20
  ********************************/
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ProductUpdate from "../components/ProductUpdate";
// import './Material.css';

class Product extends Component {
    state = {
        redirect: false,
        productData: []
    };

    render() {
        return (
            <div>
                <Container id="container">
                    <ProductUpdate data={this.props.location.state.product} />
                </Container>
            </div>
        );

    }
}

export default Product;