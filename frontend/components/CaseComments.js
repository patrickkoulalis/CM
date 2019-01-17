//@ts-check

import React, { Component } from 'react';
import styled from 'styled-components';

class CaseComments extends Component {
  render() {
    const note = this.props.note;
    return (
      <Wrap>
        <div>{note}</div>
        <br />
        <button>Edit</button> <button>Delete</button>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  margin-bottom: 10px;
  padding: 40px;
  border: solid 1px whitesmoke;
  border-radius: 2px;
`;

export default CaseComments;
