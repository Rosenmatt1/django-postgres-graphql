import React from 'react';
import './App.css';
import PokerMain from './components/PokerMain.js'
import Loader from './components/Shared/Loader.js'
import Error from './components/Shared/Error.js'

import Register from './components/Auth/Register.js'
import Login from './components/Auth/Login.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
// import { UserContext } from '../../Root';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Header from './components/Shared/Header';


export const UserContext = React.createContext()


function App() {
  let currentUser = true  //for now

  return (
    <div className="App">
      <Query query={ME_QUERY} fetchPolicy='cache-and-network'>
        {({ data, loading, error }) => {
          console.log(data)
          if (loading) return <Loader loading={loading} />
          if (error) return <Error error={error} />
          const currentUser = data.me

          return (
            <Router>
              <UserContext.Provider value={currentUser}>
                {/* <Header currentUser={currentUser} /> */}
                <Switch>
                  <Route exact path="/" component={PokerMain} />
                  {/* <Route path="/profile/:id" component={Profile} /> */}
                </Switch>
              </UserContext.Provider>
            </Router>
          )
        }}
      </Query>
      {/* <Test /> */}
    </div>

  )
}

export const ME_QUERY = gql`
    {
        me {
            id 
            username
        }
    }
`


export default App;
