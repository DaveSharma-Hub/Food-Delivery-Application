import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CartStoreContextProvider from './utils/CartStoreContextProvider';

const middlewareEndpoint = process.env.REACT_MIDDLEWARE || 'http://localhost:4000/graphql';

const apolloClient = new ApolloClient({
  uri:middlewareEndpoint,
  cache: new InMemoryCache()
})

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
