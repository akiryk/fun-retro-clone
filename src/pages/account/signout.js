import React from 'react';
import { withFirebase } from '../../firebase';
import { navigate } from 'gatsby';
import * as ROUTES from '../../constants/routes';

const makeSignOut = firebase => () => {
  firebase.doSignOut().then(() => {
    navigate(ROUTES.HOME);
  });
};

const SignOutButton = ({ firebase }) => {
  const signOut = makeSignOut(firebase);
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
