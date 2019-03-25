import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import SignOutButton from '../pages/account/signout';

const NavWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-left: ${props => props.marginLeft || '20px'};
`;

const StyledNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  display: block;
  border: 1px solid white;
  border-radius: 6px;
  padding: 5px 20px;

  :hover {
    background-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 16px 10px -12px rgba(0, 0, 0, 0.5);
  }
`;

const Navigation = () => (
  <NavWrapper>
    <ListItem marginLeft="0">
      <StyledNavLink to={ROUTES.HOME}>Home</StyledNavLink>
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.SIGN_UP}>Sign Up</StyledNavLink>
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.SIGN_IN}>Sign In</StyledNavLink>
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.ACCOUNT}>Account</StyledNavLink>
    </ListItem>
    <ListItem>
      <SignOutButton />
    </ListItem>
  </NavWrapper>
);

export default Navigation;
