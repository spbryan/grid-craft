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
import './style.css';

class MaterialsInput extends Component {

  state = {
    materialNumber: 1,
    activeIndicator: 'Y',
    userId: '',
    skuNumber: '',
    name: '',
    type: '',
    gauge: '',
    length: '',
    purchasedFrom: '',
    purchasedLink: '',
    totalQuantity: 0,
    currentQuantity: 0,
    price: 0,
    pricePerUnit: 0,
    imageLink: '',
    redirect: false
  };

  componentDidMount() {
    console.log("<debug> " + this.props.location.state.materialNumber);
    this.setState({
      userId: sessionStorage.userID,
      materialNumber: this.props.location.state.materialNumber,
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
    API.addMaterial(this.state)
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

  determinePricePerUnit = () => {
    if (this.state.totalQuantity > 0 && this.state.price > 0) {
      var pricePerUnit = this.state.price / this.state.totalQuantity;
      return pricePerUnit.toFixed(2);
    }
    else {
      return 0;
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
    return (
      <div className="inner-container form-label">
        <h2 align="center" className="header">
          Enter a Material
        </h2>
        <Row>
          <Col sm={5}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Material Name</Form.Label>
                <Form.Control type="name" name="name" placeholder={this.state.name} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col sm={3}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridType">
                <Form.Label>Material Type</Form.Label>
                <Form.Control type="type" name="type" placeholder={this.state.type} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGauge">
                <Form.Label>Gauge</Form.Label>
                <Form.Control as="select" name="gauge" onChange={this.handleInputChange}>
                  <option>{this.state.gauge}</option>
                  <option>24</option>
                  <option>22</option>
                  <option>21</option>
                  <option>20</option>
                  <option>18</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridLength">
                <Form.Label>Length</Form.Label>
                <Form.Control type="length" name="length" placeholder={this.state.length} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSKUNumber">
                <Form.Label>SKU Number</Form.Label>
                <Form.Control type="skuNumber" name="skuNumber" placeholder={this.state.skuNumber} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTotalQuantity">
                <Form.Label>Total Quantity</Form.Label>
                <Form.Control type="number" name="totalQuantity" placeholder={this.state.totalQuantity} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCurrentQuantity">
                <Form.Label>Current Quantity</Form.Label>
                <Form.Control type="number" name="currentQuantity" placeholder={this.state.currentQuantity} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control type="price" name="price" placeholder={"$ " + this.state.price} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPricePerUnit">
                <Form.Label>Price Per Unit</Form.Label>
                <Form.Control type="pricePerUnit" name="pricePerUnit" placeholder={"$ " + this.determinePricePerUnit()} onChange={this.handleInputChange} />
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
                <Form.Control type="purchasedLink" name="purchasedLink" placeholder={"http://" + this.state.purchasedLink} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNotes">
                <Form.Label>Additional Details</Form.Label>
                <Form.Control as="textarea" rows="3" type="notes" name="notes" placeholder={this.state.notes} onChange={this.handleInputChange} />
                {/* <Form.Control type="notes" name="notes" placeholder={this.state.notes} onChange={this.handleInputChange} /> */}
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

export default MaterialsInput;