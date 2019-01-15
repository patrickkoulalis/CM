import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Link from 'next/link';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Inner>
          <>
            <div>
              <Link href="/" passHref>
                <a>Home</a>
              </Link>
              <br />
              <Link href="/new-case" passHref>
                <a>Submit a Case</a>
              </Link>
            </div>
            <div>{this.props.children}</div>
          </>
        </Inner>
      </ThemeProvider>
    );
  }
}

const theme = {
  blue: 'black'
};

injectGlobal`
	html {
		box-sizing: border-box;
		font-size: 10px;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		padding: 0;
		margin: 0;
		font-size: 1.8rem;
		line-height: 2;
	}
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 10px;
`;

export default Page;
