import React, { Component } from 'react';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import './style.css';


class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
  }
  redirectLocation = '';

  // handleInputChange = event => {
  //   console.log('handle input change on signup: ' + event.target.name + ' ' + event.target.value.toUpperCase());
  //   this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  // }

  handleInputChange = event => {
    console.log('handle input change on signup: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  submitRegister = event => {
    event.preventDefault();
    API.register(this.state)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("userID", res.data._id);
        sessionStorage.setItem("email", res.data.email);
        this.redirectLocation = '/';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submitlogin form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  render() {
    // if redirect is true then go elsewhere
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
    // else display login form
    return (
      <div className="inner-container">
        <h2 align="center" className="header">
          Sign-up
        </h2>
        <div className="box">
          <Form onSubmit={this.submitRegister}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Email" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Sign-up
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignupForm;