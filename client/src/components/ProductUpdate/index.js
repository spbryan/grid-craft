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
    type: '',
    description: '',
    focalBead: '',
    findings: '',
    numberAvailable: 0,
    numberSold: 0,
    pricePerUnit: 0,
    netCostPerUnit: 0,
    imageLink: '',
    redirect: false
  };


  componentDidMount() {
    console.log("spb" + JSON.stringify(this.props.data));
    this.setState({
      userId: this.props.data.userId,
      _id: this.props.data._id,
      type: this.props.data.type,
      description: this.props.data.description,
      focalBead: this.props.data.focalBead,
      findings: this.props.data.findings,
      numberAvailable: this.props.data.numberAvailable,
      numberSold: this.props.data.numberSold,
      pricePerUnit: this.props.data.pricePerUnit,
      netCostPerUnit: this.props.data.netCostPerUnit,
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
    API.updateProduct(this.state._id, this.state)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/inventory';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submit product form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  handleDelete = event => {
    event.preventDefault();
    API.deleteProduct(this.state._id)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/inventory';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for delete product form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  handleAddMaterial = event => {
    event.preventDefault();
    console.log("adding material")
  }

  handleAddSales = event => {
    event.preventDefault();
    console.log("adding sales")
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
    return (
      <div className="inner-container">
        <h2 align="right" className="header">
          {"Product Information"}
        </h2>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridType">
                <Form.Label>Type</Form.Label>
                <Form.Control type="type" name="type" placeholder={this.state.type} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col sm={3}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFindings">
                <Form.Label>Findings</Form.Label>
                <Form.Control type="findings" name="findings" placeholder={this.state.findings} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col sm={3}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFocalBead">
                <Form.Label>Focal Bead</Form.Label>
                <Form.Control type="focalBead" name="focalBead" placeholder={this.state.focalBead} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" type="description" name="description" placeholder={this.state.description} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNumberAvailable">
                <Form.Label>Number Available</Form.Label>
                <Form.Control type="numberAvailable" name="numberAvailable" placeholder={this.state.numberAvailable} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNumberSold">
                <Form.Label>Number Sold</Form.Label>
                <Form.Control readOnly={true} type="numberSold" name="numberSold" placeholder={this.state.numberSold} onChange={this.handleInputChange} />
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
        <h2 align="right" className="header">
          {"Materials Used"}
        </h2>
        <Row>
          <Col className="form-button" align="center">
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleAddMaterial}>Add Material</Button>
          </Col>
        </Row>
        <h2 align="right" className="header">
          {"Sales"}
        </h2>
        <Row>
          <Col className="form-button" align="center">
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleAddSales}>Add Sales</Button>
          </Col>
        </Row>
      </div>
    );
  }

}

export default ProductUpdate;