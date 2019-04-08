import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'gatsby';
import withFirebaseConsumer from '../../components/firebase/with_firebase_consumer';

class UserListBase extends Component {
  state = {
    loading: false,
    users: [],
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <h2>Users</h2>
        {this.state.loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <dl>
                <dt>Email</dt>
                <dd> {user.email}</dd>
                <dt>Username</dt>
                <dd> {user.username}</dd>
                <dt>Details</dt>
                <dd>
                  <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withFirebaseConsumer(UserListBase);
