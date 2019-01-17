import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import SingleCase from '../components/SingleCase';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Case extends React.Component {
  render() {
    return (
      <div>
        <h1>Single Case</h1>
        <div className="case-list">
          <SingleCase id={this.props.query.id} />
        </div>
      </div>
    );
  }
}

export default Case;
