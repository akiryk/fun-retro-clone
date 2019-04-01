import React from 'react';
import FirebaseContext from '../../context/firebase_context';

const withFirebaseConsumer = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default withFirebaseConsumer;
