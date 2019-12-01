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
import './Materials.css';

class Materials extends Component {
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
        this.getMaterials();
    }

    state = {
        redirect: false,
        materialsData: [],
        nextMaterialId: 1
    };

    redirectLocation = '';

    handleOpenForm = event => {
        event.preventDefault();this.redirectLocation = '/materialInput';
        this.determineNextMaterialId();
        this.setState({ redirect: true });  // causes a re-render so put it last
    };

    determineNextMaterialId = () => {
        var nextHighest = 1;
        this.state.materialsData.forEach(element => {
            if (nextHighest <= element.materialId) {
                nextHighest = element.materialId + 1;
            }
        });
        this.setState({nextMaterialId: nextHighest});
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
        // if (this.state.redirect) {
        //     return <Redirect to={this.redirectLocation} />;
        // }
        if (this.state.redirect) {
            return (<Redirect to={{
              pathname: this.redirectLocation,
              state: { materialId: this.state.nextMaterialId }
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