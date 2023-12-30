import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CartStoreContextProvider from './utils/CartStoreContextProvider';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const middlewareEndpoint = process.env.REACT_MIDDLEWARE_HTTP || 'http://localhost:4000/graphql';
const websocketMiddlewareEndpoint = process.env.REACT_MIDDLEWARE_WS || 'ws://localhost:4000/graphql';

const wsLink = new GraphQLWsLink(createClient({
  url:websocketMiddlewareEndpoint
}));

const httpLink = new HttpLink({
  uri: middlewareEndpoint
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  // </React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <CartStoreContextProvider>
        <App />
      </CartStoreContextProvider>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
