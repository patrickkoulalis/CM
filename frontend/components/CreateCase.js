import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '../components/Button';

const CREATE_CASE_QUERY = gql`
  mutation CREATE_CASE_QUERY(
    $assigned: String!
    $caseId: String!
    $patient: String!
    $priority: String!
    $status: String!
  ) {
    createCase(
      assigned: $assigned
      caseId: $caseId
      priority: $priority
      patient: $patient
      status: $status
    ) {
      id
      caseId
    }
  }
`;

class CreateCase extends React.Component {
  state = {
    caseId: 'NC' + Math.floor(Math.random() * 10000),
    status: 'Queued',
    assigned: '---',
    patient: '---',
    priority: 'Normal'
  };

  handleChange = e => {
    const { value, type, name } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation mutation={CREATE_CASE_QUERY} variables={this.state}>
        {(createCase, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createCase();
              console.log(res.data.createCase.id);
              Router.push({
                pathname: '/case',
                query: { id: res.data.createCase.id }
              });
            }}
          >
            <fieldset>
              <label htmlFor="paient">
                Paient Name
                <input
                  type="text"
                  name="patient"
                  id="patient"
                  placeholder="Paient Name"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="assigned">
                Assigned
                <input
                  type="text"
                  name="assigned"
                  id="assigned"
                  placeholder="Assigned"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="status">
                Assigned
                <input
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Status"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="priority">
                priority
                <input
                  type="text"
                  name="priority"
                  id="priority"
                  placeholder="priority"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="comments">
                Comments
                <textarea
                  rows="10"
                  name="comments"
                  id="comments"
                  onChange={this.handleChange}
                />
              </label>
              <button>Create Case</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  & input,
  & textarea {
    display: block;
    width: 100%;
  }
`;

export default CreateCase;
