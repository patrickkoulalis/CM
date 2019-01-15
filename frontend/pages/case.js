import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import CaseFull from '../components/CaseFull';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class Case extends React.Component {
  render() {
    return (
      <div>
        <h1>All Cases</h1>
        <div className="case-list">
          <CaseFull id={this.props.query.id} />
        </div>
      </div>
    );
  }
}

export default Case;
