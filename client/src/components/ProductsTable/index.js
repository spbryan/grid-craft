/********************************
  * Products Table
  * 
  * @author Sean Bryan
  * 
  * 2019-12-06
  ********************************/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    sortable: true,
  },
  {
    name: 'Focal Bead',
    selector: 'focalBead',
    sortable: true
  },
  {
    name: 'Findings',
    selector: 'findings',
    sortable: true
  },
  {
    name: 'Number Available',
    selector: 'numberAvailable',
    sortable: true,
    maxWidth: '10px'
  },
  {
    name: 'Number Sold',
    selector: 'numberSold',
    sortable: true,
    maxWidth: '10px'
  }
];

class ProductsTable extends Component {
  state = {
    redirect: false,
    product: []
  };

  redirectLocation = '';
  // song = '';

  handleClick = (state) => {
    this.redirectLocation = '/product';
    this.product = state;
    this.setState({
      redirect: true
    });  // causes a re-render so put it last
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.redirectLocation,
        state: { product: this.product }
      }} />)
    }
    return (
      <DataTable
        columns={columns}
        data={this.props.data}
        striped={true}
        highlightOnHover={true}
        pointerOnHover={true}
        onRowClicked={this.handleClick}
        pagination={true}
      />
    )
  }
}

export default ProductsTable;