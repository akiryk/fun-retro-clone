import React from 'react';
import Layout from '../../components/layout';
import PasswordResetForm from '../../components/account/password_change';
import PasswordForgetForm from '../../components/account/password_forget';
import withAuthorizationConsumer from '../../components/session/with_authorization_consumer';

const AccountPageContentBase = () => (
  <>
    <h1>This is Account Page</h1>
    <PasswordResetForm />
    <PasswordForgetForm />
  </>
);

const condition = authUser => !!authUser;
const AccountPageWithAuth = withAuthorizationConsumer(condition)(
  AccountPageContentBase
);

/**
 * AccountPageWithAuth must go inside of Layout, since Layout is what includes the Provider
 */
const AccountPage = () => (
  <Layout>
    <AccountPageWithAuth />
  </Layout>
);

export default AccountPage;
