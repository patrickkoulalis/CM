//@ts-check

import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import Button from '../components/Button';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const POST_CASE = gql`
  mutation CaseMutation(
    $assigned: String!
    $caseId: String!
    $patient: String!
    $priority: String!
    $status: String!
  ) {
    createCase(
      data: {
        assigned: $assigned
        caseId: $caseId
        priority: $priority
        patient: $patient
        caseStatus: $status
      }
    ) {
      assigned
      patient
      priority
      caseId
    }
  }
`;

class NewCase extends React.Component {
  state = {
    status: 'Queued',
    assigned: '---',
    patient: '---',
    priority: 'Normal'
  };

  render() {
    const mutationVariables = {
      status: this.state.status,
      assigned: this.state.assigned,
      patient: this.state.patient,
      priority: this.state.priority,
      caseId: 'NC' + Math.floor(Math.random() * 10000)
    };

    return (
      <React.Fragment>
        <h1>Submit A Case</h1>
        <FormWrap>
          <Mutation
            mutation={POST_CASE}
            variables={mutationVariables}
            onCompleted={data => {
              Router.push({
                pathname: `/case`,
                query: { id: data.createCase.caseId }
              });
            }}
          >
            {caseMutation => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  caseMutation();
                  e.currentTarget.reset();
                }}
              >
                <label htmlFor="status">Status</label>
                <select
                  onChange={e =>
                    this.setState({ status: e.currentTarget.value })
                  }
                  name="status"
                >
                  <option value="queued">Queued</option>
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                  <option value="review">Review</option>
                </select>
                <label htmlFor="assigned">Assigned</label>
                <input
                  onChange={e =>
                    this.setState({ assigned: e.currentTarget.value })
                  }
                  type="text"
                  name="assigned"
                />
                <label htmlFor="patient">Patient</label>
                <input
                  onChange={e =>
                    this.setState({ patient: e.currentTarget.value })
                  }
                  type="text"
                  name="patient"
                />
                <label htmlFor="priorty">Priority</label>
                <select
                  onChange={e =>
                    this.setState({ priority: e.currentTarget.value })
                  }
                  name="priorty"
                >
                  <option value="Normal"> P3:Normal</option>
                  <option value="Low"> P4:Low</option>
                  <option value="Important"> P2:Important</option>
                  <option value="Critical">P1:Critical</option>
                </select>
                <button>Submit</button>
              </form>
            )}
          </Mutation>
        </FormWrap>
      </React.Fragment>
    );
  }
}

const FormWrap = styled.div`
  max-width: 500px;
  & form > *:not(button):not(label) {
    display: block;
    width: 100%;
    border: 1px solid #c1c1c1;
  }
`;

export default NewCase;
