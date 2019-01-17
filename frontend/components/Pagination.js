import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    casesConnection {
      aggregate {
        count
      }
    }
  }
`;

class Pagination extends Component {
  render() {
    return (
      <div>
        <Query query={PAGINATION_QUERY}>
          {({ data, loading, error }) => {
            const count = data.casesConnection.aggregate.count || 1;
            const pages = Math.ceil(count / perPage);
            const { page } = this.props;
            return (
              <>
                <Link
                  prefetch
                  href={{
                    pathname: '/',
                    query: { page: page - 1 }
                  }}
                >
                  <button disabled={page <= 1} aria-disabled={page <= 1}>
                    ←Prev
                  </button>
                </Link>
                <p>Page 1 of {pages}</p>
                <Link
                  prefetch
                  href={{
                    pathname: '/',
                    query: { page: page + 1 }
                  }}
                >
                  <button
                    disabled={page >= pages}
                    aria-disabled={page >= pages}
                  >
                    Next→
                  </button>
                </Link>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Pagination;
