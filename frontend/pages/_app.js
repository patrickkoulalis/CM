import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/with-apollo-client';
import Page from '../components/Page';
import Router from 'next/router';
import NProgress from 'nprogress';
import Meta from '../components/Meta';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

class ControlApp extends App {
  // App State
  state = {
    menuActive: false
  };

  // Object for storing and passing methods to <Component /> Useage: {...this.methods}
  methods = {
    menuToggle: () =>
      this.state.menuActive === false
        ? this.setState({ menuActive: true })
        : this.setState({ menuActive: false }),
    addCase: c => {
      const cases = [...this.state.cases];
      c.case_id = 'NC' + Math.floor(Math.random() * 10000);
      c.date_created = Date.now();
      cases.push(c);
      this.setState({ cases });
    }
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Meta />
            <div className="bar" />
            <Component {...pageProps} {...this.methods} {...this.state} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(ControlApp);
