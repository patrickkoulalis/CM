import React, { Component } from 'react';
import UpdateCase from '../components/UpdateCase';

class update extends Component {
  render() {
    return <UpdateCase id={this.props.query.id} />;
  }
}

export default update;
