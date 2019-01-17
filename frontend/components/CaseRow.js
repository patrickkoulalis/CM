import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from './Button';
import CaseNote from './CaseComments';

class CaseRow extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <Link href={`/case?id=${details.id}`}>
        <Wrap>
          <p>Case ID: {details.caseId}</p>
          <p>Date Created: {details.createdAt}</p>
          <p>Assigned: {details.assigned}</p>
          <p>Status: {details.status}</p>
          <p>Patient: {details.patient}</p>
          <p>Priority: {details.priority}</p>
        </Wrap>
      </Link>
    );
  }
}

const Wrap = styled.div`
  box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.2);
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  & p {
    border-bottom: 1px solid whitesmoke;
    padding-bottom: 5px;
    flex: 0 0 25%;
  }
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
`;

export default CaseRow;
