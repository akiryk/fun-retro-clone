/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
// import withAuthenticationProvider from './session/with_authentication_provider';
import { withSessionProvider } from '../context/session_context';
import { Normalize } from 'styled-normalize';
import Header from './header';
import '../styles/root.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Normalize />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, Love & Attention</footer>
      </>
    )}
  />
);

export default withSessionProvider(Layout);
