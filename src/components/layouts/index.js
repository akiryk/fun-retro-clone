import React from 'react';
import Layout from '../../components/layout';

const withLayout = (Component, title) => props => (
  <Layout title={title}>
    <Component {...props} />
  </Layout>
);

export default withLayout;
