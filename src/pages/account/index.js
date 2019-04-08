import React from 'react';
import PasswordResetForm from '../../components/account/password_change';
import PasswordForgetForm from '../../components/account/password_forget';
import withAuthorizationConsumer from '../../components/session/with_authorization_consumer';
import withLayout from '../../components/layouts';

const AccountPageContentBase = () => (
  <>
    <h1>This is Account Page</h1>
    <PasswordResetForm />
    <PasswordForgetForm />
  </>
);

const getIsUserAuthorized = authUser => !!authUser;
const AccountPage = withAuthorizationConsumer(getIsUserAuthorized)(
  AccountPageContentBase
);

export default withLayout(AccountPage);
