/********************************
  * Sales Table
  * 
  * @author Sean Bryan
  * 
  * 2019-12-14
  ********************************/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Date',
    selector: 'saleDate',
    sortable: true,
  },
  {
    name: 'Location',
    selector: 'saleLocation',
    sortable: true,
  },
  {
    name: 'Product Number',
    selector: 'productNumber',
    sortable: true,
  },
  {
    name: 'Units Sold',
    selector: 'unitsSold',
    sortable: true
  },
  {
    name: 'Net Cost Per Unit',
    selector: 'netCostPerUnit',
    sortable: true
  },
  {
    name: 'Price Per Unit',
    selector: 'pricePerUnit',
    sortable: true
  },
  {
    name: 'Total Profit',
    selector: 'totalProfit',
    sortable: true
  },
];

class SalesTable extends Component {
  state = {
    redirect: false,
    sale: []
  };

  redirectLocation = '';

  handleClick = (state) => {
    this.redirectLocation = '/sale';
    this.sale = state;
    this.setState({
      redirect: true
    });  // causes a re-render so put it last
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.redirectLocation,
        state: { sale: this.sale }
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

export default SalesTable;