/********************************
  * Materials Form
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/

import React, { Component } from 'react';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProductInput extends Component {

  state = {
    userId: '',
    type: '',
    description: '',
    currentCount: 0,
    pricePerUnit: 0,
    netCostPerUnit: 0,
    imageLink: '',
    materialIds: [],
    redirect: false
  };

  componentDidMount() {
    this.setState({
      userId: sessionStorage.userID,
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
    API.addProduct(this.state)
      .then(res => {
        console.log(res.data);
        this.product = res.data;
        this.redirectLocation = '/product';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submit product form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.redirectLocation,
        state: { product: this.product }
      }} />)
    }
    // if (this.state.redirect) {
    //   return <Redirect to={this.redirectLocation} />;
    // }
    return (
      <div className="inner-container">
        <h2 align="center" className="header">
          Enter a Product
        </h2>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" name="description" placeholder={this.state.description} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridType">
                <Form.Label>Type</Form.Label>
                <Form.Control type="type" name="type" placeholder={this.state.type} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCurrentCount">
                <Form.Label>Starting Count</Form.Label>
                <Form.Control type="currentCount" name="currentCount" placeholder={this.state.currentCount} onChange={this.handleInputChange} />
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
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridImageLink">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="imageLink" name="imageLink" placeholder={"http://" + this.state.imageLink} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col className="form-button" align="right">
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleFormSubmit}>Submit</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default ProductInput;