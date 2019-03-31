import React from 'react';
import { navigate } from 'gatsby';
import withFirebase from '../firebase/with_firebase';
import getFirebase from '../firebase/firebase';
import AuthUserContext from '../session/context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          navigate(ROUTES.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithAuthorization);
};

export default withAuthorization;
