import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CaseRow from '../components/CaseRow';
import Pagination from '../components/Pagination';
import { perPage } from '../config';

const ALL_CASES_QUERY = gql`
  query ALL_CASES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    cases(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      caseId
      assigned
      priority
      patient
      status
    }
  }
`;

class Cases extends React.Component {
  render() {
    return (
      <div>
        <Query
          query={ALL_CASES_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;

            if (error) {
              console.log('Error:' + error);
              return <p>Error</p>;
            }
            return data.cases.map(caseData => (
              <CaseRow key={caseData.id} details={caseData} />
            ));
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Cases;
export { ALL_CASES_QUERY };
