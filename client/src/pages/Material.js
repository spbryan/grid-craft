/********************************
  * Page with the material-specific details
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MaterialUpdate from "../components/MaterialUpdate";
import './Material.css';

class Material extends Component {
    componentDidMount() {
        console.log("Test");
    }

    state = {
        redirect: false,
        materialData: []
    };

    render() {
        return (
            <div>
                <Container id="container">
                    <MaterialUpdate data={this.props.location.state.material} />
                </Container>
            </div>
        );

    }
}

export default Material;