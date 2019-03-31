import React from 'react';
import withFirebase from '../firebase/with_firebase';
import AuthUserContext from './context';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
    };

    componentDidMount() {
      console.log('at authentication: ', this.props.firebase);
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
