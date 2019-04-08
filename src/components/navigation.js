import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import SignOutButton from '../pages/account/signout';
// import AuthUserContext from './session/context';
import SessionContext from '../context/session_context';

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
  color: #333;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  display: block;
  border: 1px solid white;
  border-radius: 6px;
  padding: 5px 20px;
  background-color: rgba(0, 0, 0, 0.06);
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 16px 10px -12px rgba(0, 0, 0, 0.5);
  }
`;

// const Navigation = ({ authUser }) =>
//   authUser ? <NavigationAuth /> : <NavigationNoAuth />;
const Navigation = () => (
  <SessionContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth user={authUser} /> : <NavigationNoAuth />
    }
  </SessionContext.Consumer>
);

const NavigationAuth = () => (
  <NavWrapper>
    <ListItem marginLeft="0">
      <StyledNavLink to={ROUTES.HOME}>Home</StyledNavLink>
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.ACCOUNT}>Account</StyledNavLink>
    </ListItem>
    <ListItem>
      <SignOutButton />
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.ADMIN}>Admin</StyledNavLink>
    </ListItem>
    <ListItem>
      <StyledNavLink to={ROUTES.STORIES}>Stories</StyledNavLink>
    </ListItem>
  </NavWrapper>
);

const NavigationNoAuth = () => (
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
  </NavWrapper>
);

export default Navigation;
