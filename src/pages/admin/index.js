import React, { Component } from 'react';
import Layout from '../../components/layout';
import withAuthorizationConsumer from '../../components/session/with_authorization_consumer';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { Match } from '@reach/router';
import { Link } from 'gatsby';

class AdminPageBase extends Component {
  state = {
    loading: false,
    users: [],
    name: 'Billy',
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
    return (
      <>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        {this.state.loading ? (
          <p>Loading</p>
        ) : (
          <Match path={ROUTES.ADMIN_DETAILS}>
            {props =>
              props.match ? <UserItem /> : <UserList users={this.state.users} />
            }
          </Match>
        )}
      </>
    );
  }
}

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);
const AdminPageWithAuth = withAuthorizationConsumer(condition)(AdminPageBase);

/**
 * AdminPageWithAuth must go inside of Layout, since Layout is what includes the Provider
 */
const AdminPage = () => (
  <Layout>
    <AdminPageWithAuth />
  </Layout>
);

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

const UserItem = () => <h2>A user item</h2>;

const UserList = ({ users }) => (
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
);

export default AdminPage;
