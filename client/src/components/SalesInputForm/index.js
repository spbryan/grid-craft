import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css';

function Form({ q, handleInputChange, handleAddSale }) {
  return (
    <Container>
      <Row>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Sale Date
              <input
                  className="form-control"
                  id="sale-date"
                  type="date"
                  name="saleDate"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </form>
        </Col>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Location
              <input
                  className="form-control"
                  id="sale-location"
                  type="text"
                  name="saleLocation"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </form>
        </Col>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Units Sold
              <input
                  className="form-control"
                  id="units-sold"
                  type="number"
                  name="unitsSold"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </form>
        </Col>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Price Per Unit
              <input
                  className="form-control"
                  id="price-per-unit"
                  type="text"
                  name="salesPricePerUnit"
                  // value="$ "
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </form>
        </Col>
        <Col className="form-button" align="right">
          <Button
            type="button"
            className="new-btn ml-4"
            onClick={handleAddSale}>Add Sale</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Form;
