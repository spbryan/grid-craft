/********************************
  * Song Table
  * 
  * @author Sean Bryan
  * 
  * 2019-10-26
  ********************************/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Artist',
    selector: 'artist',
    sortable: true
  },
  {
    name: 'Genre',
    selector: 'genre',
    sortable: true
  },
  {
    name: 'Guitar Type',
    selector: 'guitarType',
    sortable: true
  },
  {
    name: 'Proficiency',
    selector: 'proficiencyRating',
    sortable: true
  },
];

class SongTable extends Component {
  state = {
    redirect: false,
    song: []
  };

  redirectLocation = '';
  song = '';
  
  handleClick = (state) => {
    this.redirectLocation = '/song';
    this.song = state;
    this.setState({ 
      redirect: true 
    });  // causes a re-render so put it last
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.redirectLocation,
        state: { song: this.song }
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

export default SongTable;