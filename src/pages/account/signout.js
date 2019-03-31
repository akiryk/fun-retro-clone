import React from 'react';
import withFirebase from '../../components/firebase/with_firebase';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components';

const makeSignOut = firebase => () => {
  firebase.doSignOut().then(() => {
    navigate(ROUTES.HOME);
  });
};

const Button = styled.button`
  color: #333;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  display: block;
  border: 1px solid #aaa;
  border-radius: 6px;
  padding: 5px 20px;
  background-color: white;
  :hover {
    box-shadow: 0 16px 10px -12px rgba(0, 0, 0, 0.5);
  }
`;

const SignOutButton = ({ firebase }) => {
  const signOut = makeSignOut(firebase);
  return (
    <Button type="button" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
