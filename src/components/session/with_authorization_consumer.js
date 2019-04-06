import React from 'react';
import { navigate } from 'gatsby';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';
// import AuthUserContext from './context';
import SessionContext from '../../context/session_context';
import * as ROUTES from '../../constants/routes';

const withAuthorizationConsumer = condition => Component => {
  class WithAuthorizationConsumer extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            navigate(ROUTES.SIGN_IN);
          }
        },
        () => navigate(ROUTES.SIGN_IN)
      );
    }

    render() {
      return (
        <SessionContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </SessionContext.Consumer>
      );
    }
  }
  return withFirebaseConsumer(WithAuthorizationConsumer);
};

export default withAuthorizationConsumer;
