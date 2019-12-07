/********************************
  * Materials Table
  * 
  * @author Sean Bryan
  * 
  * 2019-11-16
  ********************************/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Material #',
    selector: 'materialNumber',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true
  },
  {
    name: 'Gauge',
    selector: 'gauge',
    sortable: true
  },
  {
    name: 'Length',
    selector: 'length',
    sortable: true
  },
  {
    name: 'Purchased From',
    selector: 'purchasedFrom',
    sortable: true
  },
  {
    name: 'Quantity',
    selector: 'quantity',
    sortable: true
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true
  },
  {
    name: 'Price Per Unit',
    selector: 'pricePerUnit',
    sortable: true
  },
];

class MaterialsTable extends Component {
  state = {
    redirect: false,
    material: []
  };

  redirectLocation = '';
  // song = '';

  handleClick = (state) => {
    this.redirectLocation = '/material';
    this.material = state;
    this.setState({
      redirect: true
    });  // causes a re-render so put it last
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.redirectLocation,
        state: { material: this.material }
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

export default MaterialsTable;