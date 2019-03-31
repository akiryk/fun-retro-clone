import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Navigation from './navigation';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  margin-bottom: 1rem;
`;

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <StyledH1>
        <Link to="/">{siteTitle}</Link>
      </StyledH1>
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
