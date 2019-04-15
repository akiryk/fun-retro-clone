/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
// import withAuthenticationProvider from './session/with_authentication_provider';
import { withSessionProvider } from '../context/session_context';
import { Normalize } from 'styled-normalize';
import Helmet from 'react-helmet';
import Header from './header';
import '../styles/root.css';

const Layout = ({ children, title }) => (
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
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, Love & Attention</footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: 'SuperFun Retro Boards',
};

export default withSessionProvider(Layout);
