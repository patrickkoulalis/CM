import React from 'react';
import styled from 'styled-components';
import Cases from '../components/Cases';

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Case Management Home</h1>
        <Cases page={parseFloat(this.props.query.page) || 1} />
      </div>
    );
  }
}

export default Index;
