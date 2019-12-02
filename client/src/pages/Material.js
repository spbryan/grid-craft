/********************************
  * Page with the material-specific details
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MaterialUpdate from "../components/MaterialUpdate";
// import Button from "react-bootstrap/Button";
// import con from "../utils/const";
// import API from "../utils/API";
import './Material.css';

class Material extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        // if (!sessionStorage.getItem("userID")) {
        //     this.props.updateWhichNav(con.LOGGED_OUT);
        // } else {
        //     this.props.updateWhichNav(con.LOGGED_IN);
        // }
        // this.setState({
        //     redirect: false
        // })
        // this.getSongs();
        console.log("Test");
        // console.log("this.props.location: " +  JSON.stringify(this.props.location.state.song)); //&& this.props.location.state.referrer");
    }

    state = {
        redirect: false,
        materialData: []
    };

    /********************
     * API Router Calls
    ********************/
    // getSongs = () => {
    //     API.getSongByUserId(sessionStorage.getItem("userID"))
    //         .then(res =>
    //             this.setState({
    //                 songData: res.data
    //             })
    //         )
    //         .catch(err => {
    //             alert("Playlist Page: get songs error: " + err);
    //             this.setState({
    //                 songData: []
    //             })
    //         });
    // };

    render() {
        // if (this.state.redirect) {
        //     // return <Redirect to={this.redirectLocation} />;
        //     return (<Redirect to={{
        //         pathname: this.redirectLocation,
        //         state: { referrer: this.state.profile }
        //     }} />)
        // }
        return (
            <div>
                <Container id="container">
                    {/* <Row>
                        <Col align="center">
                            <h1>{this.props.location.state.material.name}</h1>
                        </Col>
                    </Row> */}
                    <MaterialUpdate data={this.props.location.state.material} />
                    {/* <Row>
                        <Col align="center">
                            <Button
                                type="button"
                                className="new-btn ml-4"
                                onClick={this.handleOpenForm}>Add New Song</Button>
                        </Col>
                    </Row> */}
                </Container>
            </div>
        );

    }
}

export default Material;