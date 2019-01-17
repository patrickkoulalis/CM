import React, { Component } from 'react';
import Link from 'next/link';
import Meta from '../components/Meta';
import styled from 'styled-components';

class Header extends Component {
  render() {
    return (
      <div>
        <Meta />
        <TopBar>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
          <Link href="/submit" passHref>
            <a>+ New Case</a>
          </Link>
          <Link href="/signup" passHref>
            <a>Signup</a>
          </Link>
        </TopBar>
      </div>
    );
  }
}

const TopBar = styled.nav`
  background: whitesmoke;
  & > a {
    display: inline-block;
    padding: 10px;
  }
`;

export default Header;
