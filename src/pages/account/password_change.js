import React from 'react';
import PasswordChangeForm from '../../components/account/password_change';
import Layout from '../../components/layout';

const PasswordChangePage = () => (
  <Layout>
    <h1>You Reset Your Password!</h1>
    <PasswordChangeForm />
  </Layout>
);

export default PasswordChangePage;
