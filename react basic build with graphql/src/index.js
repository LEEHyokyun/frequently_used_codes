import React from 'react';
import ReactDOM from 'react-dom';
import App from './elements/App.js';

import {ApolloProvider} from '@apollo/client';
import client from './apollo.js'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
