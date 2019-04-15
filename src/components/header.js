import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Navigation from './navigation';
import styled from 'styled-components';

const SiteHeading = styled.p`
  margin-bottom: 1rem;
`;

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <SiteHeading>
        <Link to="/">{siteTitle}</Link>
      </SiteHeading>
      <nav>
        <Navigation />
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
