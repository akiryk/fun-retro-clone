/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import getFirebase from './firebase/firebase';
import FirebaseContext from './firebase/context';
import { StaticQuery, graphql } from 'gatsby';
import withAuthentication from './session/with_authentication';
import styled from 'styled-components';
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

const AuthLayout = withAuthentication(Layout);

const App = ({ children }) => (
  <FirebaseContext.Provider value={getFirebase()}>
    <AuthLayout>{children}</AuthLayout>
  </FirebaseContext.Provider>
);

export default App;
