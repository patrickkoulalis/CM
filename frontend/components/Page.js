import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Link from 'next/link';
import Header from '../components/Header';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Inner>
            <div>{this.props.children}</div>
          </Inner>
        </div>
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
  max-width: 90vw;
  padding: 0 10px;
  /* display: grid;
  grid-template-columns: 1fr 4fr; */
`;

export default Page;
