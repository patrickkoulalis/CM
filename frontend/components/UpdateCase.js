import React, { Component } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SINGLE_CASE_QUERY = gql`
  query SINGLE_CASE_QUERY($id: ID!) {
    case(where: { id: $id }) {
      caseId
      assigned
      priority
      patient
    }
  }
`;

// const UPDATE_CASE_MUTATION = gql`
//   mutation UPDATE_CASE_MUTATION {
//     updateCase()
//   }
// `;

class UpdateCase extends Component {
  state = {};

  render() {
    return (
      <Query query={SINGLE_CASE_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          console.log(data.case);
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
              }}
            >
              <fieldset>
                <label htmlFor="paient">
                  Paient Name
                  <input
                    type="text"
                    name="patient"
                    id="patient"
                    defaultValue={data.case.patient}
                  />
                </label>
                <label htmlFor="assigned">
                  Assigned
                  <input
                    type="text"
                    name="assigned"
                    id="assigned"
                    defaultValue={data.case.assigned}
                  />
                </label>
                <label htmlFor="caseId">
                  caseId
                  <input
                    type="text"
                    name="caseId"
                    id="caseId"
                    defaultValue={data.case.caseId}
                  />
                </label>
                <label htmlFor="priority">
                  priority
                  <input
                    type="text"
                    name="priority"
                    id="priority"
                    defaultValue={data.case.priority}
                  />
                </label>
                <label htmlFor="comments">
                  Comments
                  <textarea rows="10" name="comments" id="comments" />
                </label>
                <button>Create Case</button>
              </fieldset>
            </Form>
          );
        }}
      </Query>
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

export default UpdateCase;
