import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css';

function Form({ q, handleInputChange, handleAddMaterial }) {
  return (
    <Container id="material-input">
      <Row>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Material ID#
              <input
                  className="form-control"
                  id="material-id"
                  type="text"
                  name="materialNumber"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          </form>
        </Col>
        <Col>
          <form>
            <div className="form-group">
              <label>
                Quantity
              <input
                  className="form-control"
                  id="material-quantity"
                  type="number"
                  name="materialQuantity"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          </form>
        </Col>
      </Row>
      <Row>
      <Col className="form-button" align="center">
          <Button
            type="button"
            className="new-btn ml-4"
            onClick={handleAddMaterial}>Add Material</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Form;
