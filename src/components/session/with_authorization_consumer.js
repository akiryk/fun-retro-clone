import React from 'react';
import { navigate } from 'gatsby';
import withFirebaseConsumer from '../firebase/with_firebase_consumer';
// import AuthUserContext from './context';
import SessionContext from '../../context/session_context';
import * as ROUTES from '../../constants/routes';

const getLocalState = itemName => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(itemName));
  }
  return null;
};

const setLocalState = (itemName, item) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(itemName, JSON.stringify(item));
  }
};

const removeFromLocalState = itemName => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(itemName);
  }
};

const withAuthorizationConsumer = condition => Component => {
  class WithAuthorizationConsumer extends React.Component {
    state = {
      authUser: getLocalState('authUser'),
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          setLocalState('authUser', authUser);
          this.setState({ authUser });
          if (!condition(authUser)) {
            navigate(ROUTES.SIGN_IN);
          }
        },
        () => {
          removeFromLocalState('authUser');
          this.setState({ authUser: null });
          navigate(ROUTES.SIGN_IN);
        }
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
