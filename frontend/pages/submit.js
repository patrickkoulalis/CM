import React from 'react';
import styled from 'styled-components';
import CreateCase from '../components/CreateCase';

class NewCase extends React.Component {
  render() {
    return (
      <div>
        <h1>Submit a New Case</h1>
        <CreateCase />
      </div>
    );
  }
}

export default NewCase;
