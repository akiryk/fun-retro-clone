/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import getFirebase, { FirebaseContext } from '../firebase';

import Header from './header';
import './layout.css';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    authUser: null,
  };

  componentDidMount() {
    getFirebase().auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={getFirebase()}>
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
              <Header
                siteTitle={data.site.siteMetadata.title}
                authUser={this.state.authUser}
              />
              <div
                style={{
                  margin: `0 auto`,
                  maxWidth: 960,
                  padding: `0px 1.0875rem 1.45rem`,
                  paddingTop: 0,
                }}
              >
                <main>{this.props.children}</main>
                <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
              </div>
            </>
          )}
        />
      </FirebaseContext.Provider>
    );
  }
}

export default Layout;
