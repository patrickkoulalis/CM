import React, { Component } from 'react';
import Button from './Button';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_CASES_QUERY } from '../components/Cases';
import Router from 'next/router';

const DELETE_CASE_MUTATION = gql`
  mutation DELETE_CASE_MUTATION($id: ID!) {
    deleteCase(id: $id) {
      id
    }
  }
`;

class DeleteButton extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_CASES_QUERY });
    data.cases = data.cases.filter(
      item => item.id !== payload.data.deleteCase.id
    );
    cache.writeQuery({ query: ALL_CASES_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_CASE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteCase, { loading, error }) => {
          return (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this case?')) {
                  deleteCase();
                  Router.push({
                    pathname: '/'
                  });
                }
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteButton;
