import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      name
      email
      password
      permissions
    }
  }
`;

class UserSignup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleChange = e => {
    const { type, name, value } = e.target;
    console.log('changed!');
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, data, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <form
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signup();
                this.setState({ name: '', email: '', password: '' });
              }}
            >
              <Error error={error} />;
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="name">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="email">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="example@test.com"
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="name">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <button>Sign Up!</button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default UserSignup;
