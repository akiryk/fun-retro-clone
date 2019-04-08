import React from 'react';
import Layout from '../../components/layout';

const withLayout = Component => props => (
  <Layout>
    <Component {...props} />
  </Layout>
);

export default withLayout;
