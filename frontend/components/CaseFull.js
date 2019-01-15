import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SINGLE_CASE_QUERY = gql`
  query SINGLE_CASE_QUERY($id: ID!) {
    case(where: { id: $id }) {
      id
      caseId
      caseStatus
      assigned
      priority
      patient
      notes
    }
  }
`;

class CaseFull extends React.Component {
  state = {};

  handelEditClick = e => {
    const state = {};
  };

  render() {
    return (
      <Query query={SINGLE_CASE_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;

          if (error) {
            console.log(error);
            return <p>Error :(</p>;
          }
          console.log(data);
          return (
            <Wrap>
              <div>
                <p>Case ID: {data.case.caseId}</p>
                <p>Date Created: {data.case.createdAt}</p>
                <p>Assigned: {data.case.assigned}</p>
                <p>Status: {data.case.caseStatus}</p>
                <p>Patient: {data.case.patient}</p>
                <p>Priority: {data.case.priority}</p>
                <div>
                  <h2>Case Notes</h2>
                  {/* {Object.keys(data.case.notes).map(key => (
                        <CaseNote
                          key={key}
                          index={key}
                          note={data.case.notes[key]}
                        />
                      ))} */}
                </div>
              </div>
              <br />
              <button onClick={this.handelEditClick}>Edit Case</button>
            </Wrap>
          );
        }}
      </Query>
    );
  }
}

const Wrap = styled.div`
  margin: 10px 0;
  padding: 10px;
  & p {
    border-bottom: 1px solid whitesmoke;
    padding-bottom: 5px;
  }
`;

export default CaseFull;
