import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeleteButton from './DeleteButton';
import CaseComments from '../components/CaseComments';

const SINGLE_CASE_QUERY = gql`
  query SINGLE_CASE_QUERY($id: ID!) {
    case(where: { id: $id }) {
      id
      caseId
      assigned
      priority
      patient
      status
    }
  }
`;

class SingleCase extends React.Component {
  state = {};

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
              <Main>
                <p>Case ID: {data.case.caseId}</p>
                <p>Date Created: {data.case.createdAt}</p>
                <p>Assigned: {data.case.assigned}</p>
                <p>Status: {data.case.status}</p>
                <p>Patient: {data.case.patient}</p>
                <p>Priority: {data.case.priority}</p>
                <br />
                <button
                  onClick={() => {
                    Router.push({
                      pathname: '/update',
                      query: { id: data.case.id }
                    });
                  }}
                >
                  Edit Case
                </button>
                <DeleteButton id={data.case.id}>
                  This is a button to delete
                </DeleteButton>
              </Main>
              <Sidebar>
                <h2>Comments</h2>
                <CaseComments />
              </Sidebar>
            </Wrap>
          );
        }}
      </Query>
    );
  }
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 10px 0;
  padding: 10px;
  & p {
    border-bottom: 1px solid whitesmoke;
    padding-bottom: 5px;
  }
`;

const Main = styled.div``;

const Sidebar = styled.div`
  margin-left: 20px;
`;

export default SingleCase;
