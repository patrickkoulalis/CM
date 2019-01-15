import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import CaseRow from '../components/CaseRow';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_CASES_QUERY = gql`
  query ALL_CASES_QUERY {
    cases {
      id
      caseId
      caseStatus
      assigned
      priority
      patient
    }
  }
`;

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Case Management Home</h1>
        <h2>GraphQL Query</h2>
        <Query query={ALL_CASES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;

            if (error) {
              console.log('Error:' + error);
              return <p>Error</p>;
            }
            console.log(data);
            return data.cases.map(caseData => (
              <CaseRow key={caseData.id} details={caseData} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default Index;
