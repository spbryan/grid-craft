/********************************
  * Product Update/Delete Form
  * 
  * @author Sean Bryan
  * 
  * 2019-11-18
  ********************************/

import React, { Component } from 'react';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProductUpdate extends Component {
  state = {
    userId: '',
    _id: '',
    name: '',
    type: '',
    materialUsed: '',
    purchasedFrom: '',
    purchasedLink: '',
    quantity: 0,
    pricePerUnit: 0,
    imageLink: '',
    redirect: false
  };


  componentDidMount() {
    console.log("spb" + JSON.stringify(this.props.data));
    this.setState({
      userId: this.props.data.userId,
      _id: this.props.data._id,
      name: this.props.data.name,
      type: this.props.data.type,
      materialUsed: this.props.data.materialUsed,
      purchasedFrom: this.props.data.purchasedFrom,
      purchasedLink: this.props.data.purchasedLink,
      quantity: this.props.data.quantity,
      pricePerUnit: this.props.data.pricePerUnit,
      imageLink: this.props.data.imageLink,
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
    API.updateMaterial(this.state._id, this.state)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/materials';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submit material form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  handleDelete = event => {
    event.preventDefault();
    API.deleteMaterial(this.state._id)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/materials';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for delete material form");
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
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Material Name</Form.Label>
                <Form.Control type="name" name="name" placeholder={this.state.name} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridType">
                <Form.Label>Material Type</Form.Label>
                <Form.Control type="type" name="type" placeholder={this.state.type} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridMaterialUsed">
                <Form.Label>Material Used</Form.Label>
                <Form.Control type="materialUsed" name="materialUsed" placeholder={this.state.materialUsed} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="quantity" name="quantity" placeholder={this.state.quantity} onChange={this.handleInputChange} />
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
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPurchasedFrom">
                <Form.Label>Purchased From</Form.Label>
                <Form.Control type="purchasedFrom" name="purchasedFrom" placeholder={this.state.purchasedFrom} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPurchasedLink">
                <Form.Label>Purchased From URL</Form.Label>
                <Form.Control type="purchasedLink" name="purchasedLink" placeholder={this.state.purchasedLink} onChange={this.handleInputChange} />
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
                <Form.Control type="imageLink" name="imageLink" placeholder={this.state.imageLink} onChange={this.handleInputChange} />
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

export default ProductUpdate;