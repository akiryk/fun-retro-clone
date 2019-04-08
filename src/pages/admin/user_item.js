import React, { Component } from 'react';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

class UserItemBase extends Component {
  state = {
    loading: false,
    user: null,
  };

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.user(this.props.id).on('value', snapshot => {
      this.setState({
        user: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  hasUserRoles = () => this.state.user.roles;

  render() {
    const { user } = this.state;

    return (
      <>
        {user && (
          <>
            <h2>User: {user.username}</h2>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            {this.hasUserRoles() && (
              <>
                <h2>Roles</h2>
                <UserRoles roles={user.roles} />
              </>
            )}
            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </>
        )}
      </>
    );
  }
}

const UserRoles = ({ roles }) => {
  return roles.map(role => <p>{role}</p>);
};

export default withFirebaseConsumer(UserItemBase);
