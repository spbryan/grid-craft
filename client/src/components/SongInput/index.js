/********************************
  * Song Form
  * 
  * @author Sean Bryan
  * 
  * 2019-10-16
  ********************************/

import React, { Component } from 'react';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SongInput extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    userId: '',
    title: '',
    artist: '',
    genre: '',
    guitarType: '',
    proficiencyRating: '',
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
    API.addSong(this.state)
      .then(res => {
        console.log(res.data);
        this.redirectLocation = '/playlist';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submit song form");
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
        <h2 align="center" className="header">
          Enter a Song
        </h2>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Song Title</Form.Label>
                <Form.Control type="title" name="title" placeholder={this.state.title} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control type="artist" name="artist" placeholder={this.state.artist} onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" name="genre" onChange={this.handleInputChange}>
                  <option>{this.state.genre}</option>
                  <option>Rock</option>
                  <option>Metal</option>
                  <option>Country</option>
                  <option>Pop</option>
                  <option>Folk</option>
                  <option>Alternative</option>
                  <option>Punk</option>
                  <option>Blues</option>
                  <option>Jazz</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGuitarType">
                <Form.Label>Guitar Type</Form.Label>
                <Form.Control as="select" name="guitarType" onChange={this.handleInputChange}>
                  <option>{this.state.guitar_type}</option>
                  <option>Electric</option>
                  <option>Acoustic</option>
                  <option>Ukulele</option>
                  <option>Banjo</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
          <Col>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGuitarType">
                <Form.Label>Proficiency</Form.Label>
                <Form.Control as="select" name="proficiencyRating" onChange={this.handleInputChange}>
                  <option>{this.state.proficiency}</option>
                  <option>Novice</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                  <option>Master</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Col>
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

export default SongInput;