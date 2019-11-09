/********************************
  * Page to inventory personal playlist
  * 
  * @author Sean Bryan
  * 
  * 2019-10-16
  ********************************/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import SongTable from "../components/SongTable";
import con from "../utils/const";
import API from "../utils/API";
import './Playlist.css';

class Playlist extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            this.props.updateWhichNav(con.LOGGED_OUT);
        } else {
            this.props.updateWhichNav(con.LOGGED_IN);
        }
        this.setState({
            redirect: false
        })
        this.getSongs();
    }

    state = {
        redirect: false,
        songData: []
    };

    redirectLocation = '';

    handleOpenForm = event => {
        event.preventDefault();this.redirectLocation = '/songinput';
        this.setState({ redirect: true });  // causes a re-render so put it last
    };

    /********************
     * API Router Calls
    ********************/
    getSongs = () => {
        API.getSongByUserId(sessionStorage.getItem("userID"))
            .then(res =>
                this.setState({
                    songData: res.data
                })
            )
            .catch(err => {
                alert("Playlist Page: get songs error: " + err);
                this.setState({
                    songData: []
                })
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.redirectLocation} />;
        }
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col align="center">
                            <h1>Playlist</h1>
                        </Col>
                    </Row>
                    <SongTable data={this.state.songData} />
                    <Row>
                        <Col align="right">
                            <Button
                                type="button"
                                className="new-btn ml-4"
                                onClick={this.handleOpenForm}>Add New Song</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }
}

export default Playlist;