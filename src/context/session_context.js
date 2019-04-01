import React from 'react';
import withFirebaseConsumer from './with_firebase_consumer';

const SessionContext = React.createContext(null);

const withSessionProvider = Component => {
  class WithSessionProvider extends React.Component {
    state = {
      authUser: null,
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <SessionContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </SessionContext.Provider>
      );
    }
  }

  return withFirebaseConsumer(WithSessionProvider);
};

export default SessionContext;

export { withSessionProvider };
