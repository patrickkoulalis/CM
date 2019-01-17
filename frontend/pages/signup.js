import React, { Component } from 'react';
import styled from 'styled-components';
import UserSignup from '../components/UserSignup';

class SignupPage extends Component {
  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <Columns>
          <UserSignup />
          <UserSignup />
          <UserSignup />
        </Columns>
      </div>
    );
  }
}

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 15px;
`;

export default SignupPage;
