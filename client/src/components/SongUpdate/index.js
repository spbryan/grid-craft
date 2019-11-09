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

class SongUpdate extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    userId: '',
    _id: '',
    title: '',
    artist: '',
    genre: '',
    guitarType: '',
    proficiencyRating: '',
    redirect: false
  };


  componentDidMount() {
    console.log("spb" + JSON.stringify(this.props.data));
    this.setState({
      userId: this.props.data.userId,
      _id: this.props.data._id,
      title: this.props.data.title,
      artist: this.props.data.artist,
      genre: this.props.data.genre,
      guitarType: this.props.data.guitarType,
      proficiencyRating: this.props.data.proficiencyRating,
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
    API.updateSong(this.state._id, this.state)
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

  handleDelete = event => {
    event.preventDefault();
    API.deleteSong(this.state._id)
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
        {/* <h2 align="center" className="header">
          Enter a Song
        </h2> */}
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
                  <option>{this.state.guitarType}</option>
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
                  <option>{this.state.proficiencyRating}</option>
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

export default SongUpdate;