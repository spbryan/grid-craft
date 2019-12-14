/********************************
  * Sale Update/Delete Form
  * 
  * @author Sean Bryan
  * 
  * 2019-12-14
  ********************************/

import React, { Component } from 'react';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Moment from 'moment';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SaleUpdate extends Component {
  state = {
    _id: '',
    userId: '',
    productId: '',
    productNumber: 0,
    saleDate: '',
    saleLocation: '',
    unitsSold: 0,
    netCostPerUnit: 0,
    pricePerUnit: 0,
    totalProfit: 0,
    redirect: false
  };


  componentDidMount() {
    this.setState({
      _id: this.props.data._id,
      userId: this.props.data.userId,
      productId: this.props.data.productId,
      productNumber: this.props.data.productNumber,
      saleDate: Moment(this.props.data.saleDate).format('MM/DD/YYYY'),
      saleLocation: this.props.data.saleLocation,
      unitsSold: this.props.data.unitsSold,
      netCostPerUnit: this.props.data.netCostPerUnit,
      pricePerUnit: this.props.data.pricePerUnit,
      totalProfit: this.props.data.totalProfit,
      redirect: false
    })
  }

  redirectLocation = '';

  handleInputChange = event => {
    console.log('handle input change on login: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateSale(this.state._id, this.state)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/sales';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submit sale form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  handleDelete = event => {
    event.preventDefault();
    API.deleteSale(this.state._id)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/sales';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for delete sale form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
    return (
      <div className="inner-container">
        <Row>
          {/* <Col sm={5}> */}
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSaleDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="saleDate" name="saleDate" placeholder={this.state.saleDate} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSaleLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="saleLocation" name="saleLocation" placeholder={this.state.saleLocation} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridProductNumber">
                <Form.Label>Product Number</Form.Label>
                <Form.Control type="productNumber" name="productNumber" placeholder={this.state.productNumber} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridUnitsSold">
                <Form.Label>Units Sold</Form.Label>
                <Form.Control type="unitsSold" name="unitsSold" placeholder={this.state.unitsSold} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNetCostPerUnit">
                <Form.Label>Net Cost Per Unit</Form.Label>
                <Form.Control type="netCostPerUnit" name="netCostPerUnit" placeholder={"$ " + this.state.netCostPerUnit} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPricePerUnit">
                <Form.Label>Price Per Unit</Form.Label>
                <Form.Control type="pricePerUnit" name="pricePerUnit" placeholder={"$ " + this.state.pricePerUnit} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTotalProfit">
                <Form.Label>Total Profit</Form.Label>
                <Form.Control type="totalProfit" name="totalProfit" placeholder={"$ " + this.state.totalProfit} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col className="form-button" align="right">
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleFormSubmit}>Update</Button>
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleDelete}>Delete</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default SaleUpdate;