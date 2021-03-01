import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  // uri: 'https://music-player-account.herokuapp.com/graphql/',
  // fetchOptions: {      //saying includes an auth header
  //   credentials: "include"
  // },
  // request: operation => {
  //   const token = localStorage.getItem('authToken') || ""
  //   operation.setContext({
  //     headers: {
  //       Authorization: `JWT ${token}`,
  //     }
  //   })
  // },
  // clientState: {
  //   defaults: {
  //     isLoggedIn: !!localStorage.getItem('authToken')
  //     //the double !! converts any value to a boolean
  //   }
  // }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
