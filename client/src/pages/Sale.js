/********************************
  * Page with the sale-specific details
  * 
  * @author Sean Bryan
  * 
  * 2019-12-14
  ********************************/
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import SaleUpdate from "../components/SaleUpdate";
import './Sale.css';

class Sale extends Component {

    // state = {
    //     redirect: false,
    //     saleData: []
    // };

    render() {
        return (
            <div>
                <Container id="container">
                    <SaleUpdate data={this.props.location.state.sale} />
                </Container>
            </div>
        );
    }
}

export default Sale;