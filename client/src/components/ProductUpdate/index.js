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
import SalesInputForm from '../../components/SalesInputForm';
import Moment from 'moment';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DRIVE_OPEN = "https://drive.google.com/open";
const DRIVE_UC = "https://drive.google.com/uc";

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
    suggestedPrice: 0,
    netCostPerUnit: 0,
    imageLink: '',
    redirect: false,
    materialNumber: 0,
    materialQuantity: 0,
    saleDate: '',
    saleLocation: '',
    unitsSold: 0,
    salesPricePerUnit: 0,
    materialsUsed: [],
    sales: []
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
      suggestedPrice: this.props.data.suggestedPrice,
      netCostPerUnit: this.props.data.netCostPerUnit,
      imageLink: this.props.data.imageLink,
      redirect: false
    })
    this.getMaterials(this.props.data._id);
    this.getSales(this.props.data._id);
    this.initializeSaleInfo();
  }

  redirectLocation = '';

  initializeSaleInfo() {
    this.setState({
      saleDate: '',
      saleLocation: '',
      unitsSold: 0,
      // netCostPerUnit: 0,
      salesPricePerUnit: 0
    })
  }

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

  getSales = (productId) => {
    API.getSalesByProductId(productId)
      .then(res => {
        this.setState({
          sales: res.data
        });
      }
      )
      .catch(err => {
        alert("Products Page: get sales error: " + err);
        this.setState({
          sales: []
        })
      });
  }

  handleAddSale = event => {
    event.preventDefault();
    console.log("adding sales")
    var sale = {
      userId: this.props.data.userId,
      productId: this.state._id,
      productNumber: this.state.productNumber,
      saleDate: this.state.saleDate,
      saleLocation: this.state.saleLocation,
      unitsSold: this.state.unitsSold,
      netCostPerUnit: this.state.netCostPerUnit,
      pricePerUnit: this.state.salesPricePerUnit,
      totalProfit: this.calculateTotalProfit()
    };
    API.addSale(sale)
      .then(res => {
        this.getSales(this.state._id);
        this.initializeSaleInfo();
      })
      .catch(err => {
        console.log("in catch for submit materials used form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  deleteMaterial = event => {
    event.preventDefault();
    console.log(event.target.id);
    API.deleteMaterialsUsedByProductId(event.target.id)
      .then(res => {
        this.getMaterials(this.state._id);
      }
      )
      .catch(err => {
        alert("Products Page: get materials used error: " + err);
        this.setState({
          materialsUsed: []
        })
      });
  }

  deleteSale = event => {
    event.preventDefault();
    console.log(event.target.id);
    API.deleteSale(event.target.id)
      .then(res => {
        this.getSales(this.state._id);
      }
      )
      .catch(err => {
        alert("Products Page: get sales error: " + err);
        this.setState({
          sales: []
        })
      });
  }

  formatImageLink = () => {
    if (this.state.imageLink.includes(DRIVE_OPEN)) {
      return this.state.imageLink.replace(DRIVE_OPEN, DRIVE_UC);
    }
    else {
      return this.state.imageLink;
    }
  }

  determineNetCostPerUnit = () => {
    var netCost = 0;
    this.state.materialsUsed.forEach(material => {
      var materialCost = material.quantity * material.pricePerUnit;
      netCost = netCost + materialCost;
    })
    return netCost;
  }

  calculateEstimatedProfit = () => {
    var profit = this.state.suggestedPrice - this.state.netCostPerUnit;
    return profit;
  }

  calculateTotalProfit = () => {
    var totalSale = this.state.unitsSold * this.state.salesPricePerUnit;
    var totalCost = this.state.unitsSold * this.state.netCostPerUnit;
    return totalSale - totalCost;
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
        <img className="center" align="center" src={this.formatImageLink()} alt={this.state.type} />
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
                  key={materialUsed._id}
                >{materialUsed.materialNumber}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>SKU #</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed._id}
                >{materialUsed.skuNumber}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Quantity</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed._id}
                >{materialUsed.quantity}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Price Per Unit</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <ListGroup.Item className="list-item"
                  key={materialUsed._id}
                >{"$" + materialUsed.pricePerUnit}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Remove Material</h6>
            <ListGroup className="list-overflow-container">
              {this.state.materialsUsed.length > 0 && this.state.materialsUsed.map(materialUsed => (
                <Button
                  type="button"
                  className="remove-material-btn ml-4"
                  key={materialUsed._id}
                  id={materialUsed._id}
                  onClick={this.deleteMaterial}>Delete</Button>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <h2 align="right" className="header">
          {"Sales"}
        </h2>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNumberAvailable">
                <Form.Label>Number Available</Form.Label>
                <Form.Control type="number" name="numberAvailable" placeholder={this.state.numberAvailable} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNumberSold">
                <Form.Label>Number Sold</Form.Label>
                <Form.Control type="number" name="numberSold" placeholder={this.state.numberSold} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNetCostPerUnit">
                <Form.Label>Net Cost (${this.determineNetCostPerUnit()})</Form.Label>
                <Form.Control type="netCostPerUnit" name="netCostPerUnit" placeholder={"$ " + this.state.netCostPerUnit} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSuggestedPrice">
                <Form.Label>Suggested Price</Form.Label>
                <Form.Control type="suggestedPrice" name="suggestedPrice" placeholder={"$ " + this.state.suggestedPrice} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTotalProfit">
                <Form.Label>Estimated Profit</Form.Label>
                <Form.Control readOnly type="totalProfit" name="totalProfit" placeholder={"$ " + this.calculateEstimatedProfit()} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <SalesInputForm
              handleInputChange={this.handleInputChange}
              handleAddSale={this.handleAddSale}
              q={this.state._id}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Sale Date</h6>
            <ListGroup className="list-overflow-container">
              {this.state.sales.length > 0 && this.state.sales.map(sale => (
                <ListGroup.Item className="list-item"
                  key={sale._id}
                >{Moment(sale.saleDate).format('MM/DD/YYYY')}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Location</h6>
            <ListGroup className="list-overflow-container">
              {this.state.sales.length > 0 && this.state.sales.map(sale => (
                <ListGroup.Item className="list-item"
                  key={sale._id}
                >{sale.saleLocation}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Units Sold</h6>
            <ListGroup className="list-overflow-container">
              {this.state.sales.length > 0 && this.state.sales.map(sale => (
                <ListGroup.Item className="list-item"
                  key={sale._id}
                >{sale.unitsSold}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Price Per Unit</h6>
            <ListGroup className="list-overflow-container">
              {this.state.sales.length > 0 && this.state.sales.map(sale => (
                <ListGroup.Item className="list-item"
                  key={sale._id}
                >{"$" + sale.pricePerUnit}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h6>Remove Sale</h6>
            <ListGroup className="list-overflow-container">
              {this.state.sales.length > 0 && this.state.sales.map(sale => (
                <Button
                  type="button"
                  className="remove-sale-btn ml-4"
                  key={sale._id}
                  id={sale._id}
                  onClick={this.deleteSale}>Delete</Button>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <h2 align="right" className="header">
          {" "}
        </h2>
        <Row>
          <Col className="form-button" align="center">
            <Button
              type="button"
              className="new-btn ml-4"
              onClick={this.handleFormSubmit}>Done</Button>
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