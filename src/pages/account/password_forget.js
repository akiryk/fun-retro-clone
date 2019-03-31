import React from 'react';
import PasswordForgetForm from '../../components/account/password_forget';
import Layout from '../../components/layout';

const PasswordForgetPage = () => (
  <Layout>
    <h1>You Forgot Your Password!</h1>
    <PasswordForgetForm />
  </Layout>
);

export default PasswordForgetPage;
