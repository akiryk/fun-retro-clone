import React from 'react';

import { FirebaseProviderHOC } from './src/context/firebase_context';

export const wrapRootElement = ({ element }) => (
  <FirebaseProviderHOC>{element}</FirebaseProviderHOC>
);
