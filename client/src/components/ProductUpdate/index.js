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
import ListGroup from "react-bootstrap/ListGroup";
import MaterialsUsedForm from '../../components/MaterialsUsedForm';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProductUpdate extends Component {
  state = {
    productNumber: 0,
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
    redirect: false,
    materialNumber: 0,
    materialQuantity: 0,
    materialsUsed: []
  };


  componentDidMount() {
    this.setState({
      productNumber: this.props.data.productNumber,
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
    this.getMaterials(this.props.data._id);
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
    API.getMaterialsByMaterialNumber(this.state.materialNumber)
      .then(res => {
        res.data.forEach(element => {
          var materialUsed = {
            userId: element.userId,
            materialNumber: element.materialNumber,
            materialId: element._id,
            productId: this.state._id,
            skuNumber: element.skuNumber,
            quantity: this.state.materialQuantity,
            pricePerUnit: element.pricePerUnit
          };
          API.addMaterialUsed(materialUsed)
            .then(res => {
              this.getMaterials(this.state._id);
            })
            .catch(err => {
              console.log("in catch for submit materials used form");
              console.log(err);
              this.redirectLocation = '/authfailure';
              this.setState({ redirect: true });   // causes a re-render so put it last
            });
        });
      })
      .catch(err => {
        console.log("in catch for get material by number form");
        console.log(err);
        this.redirectLocation = '/authfailure';
      });
  }

  getMaterials = (productId) => {
    API.getMaterialsUsedByProductId(productId)
      .then(res => {
        this.setState({
          materialsUsed: res.data
        });
      }
      )
      .catch(err => {
        alert("Products Page: get materials used error: " + err);
        this.setState({
          materialsUsed: []
        })
      });
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
          {"Product Number: " + this.state.productNumber}
        </h2>
        <img className="center" align="center" src={this.state.imageLink} alt={this.state.type} />
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
          <Col xs={7}>
            <MaterialsUsedForm
              handleInputChange={this.handleInputChange}
              handleAddMaterial={this.handleAddMaterial}
              q={this.state._id}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Material #</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed.materialNumber}
                >{materialUsed.materialNumber}</ListGroup.Item>
                // onClick={() => this.handleEmployeeSelect(availableEmployee.id)}>{availableEmployee.last_name}, {availableEmployee.first_name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>SKU #</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed.skuNumber}
                >{materialUsed.skuNumber}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Quantity</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed.quantity}
                >{materialUsed.quantity}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Price Per Unit</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed.pricePerUnit}
                >{"$" + materialUsed.pricePerUnit}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Remove Material</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                // <ListGroup.Item className="list-item"
                //   key={materialUsed.pricePerUnit}
                // >{"$" + materialUsed.pricePerUnit}</ListGroup.Item>
                <Button
                  type="button"
                  className="remove-material-btn ml-4"
                  onClick={this.handleAddSales}>Delete</Button>
              ))}
            </ListGroup>
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