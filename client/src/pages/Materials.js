/********************************
  * Page to inventory materials
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import MaterialsTable from "../components/MaterialsTable";
import con from "../utils/const";
import API from "../utils/API";

class Materials extends Component {

    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            this.props.updateWhichNav(con.LOGGED_OUT);
        } else {
            this.props.updateWhichNav(con.LOGGED_IN);
        }
        this.setState({
            redirect: false
        })
        this.getMaterials();
    }

    state = {
        redirect: false,
        materialsData: [],
        nextMaterialNumber: 1
    };

    redirectLocation = '';

    handleOpenForm = event => {
        event.preventDefault();this.redirectLocation = '/materialInput';
        this.determineNextMaterialNumber();
        this.setState({ redirect: true });  // causes a re-render so put it last
    };

    determineNextMaterialNumber = () => {
        var nextHighest = 1;
        this.state.materialsData.forEach(element => {
            if (nextHighest <= element.materialNumber) {
                nextHighest = element.materialNumber + 1;
            }
        });
        this.setState({nextMaterialNumber: nextHighest});
    }

    /********************
     * API Router Calls
    ********************/
    getMaterials = () => {
        API.getMaterialsByUserId(sessionStorage.getItem("userID"))
            .then(res =>
                this.setState({
                    materialsData: res.data
                })
            )
            .catch(err => {
                alert("Materials Page: get materials error: " + err);
                this.setState({
                    materialsData: []
                })
            });
    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
              pathname: this.redirectLocation,
              state: { materialNumber: this.state.nextMaterialNumber }
            }} />)
          }
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col align="center">
                            <h1>Materials</h1>
                        </Col>
                    </Row>
                    <MaterialsTable data={this.state.materialsData} />
                    <Row>
                        <Col align="right">
                            <Button
                                type="button"
                                className="new-btn ml-4"
                                onClick={this.handleOpenForm}>Add Material</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }
}

export default Materials;