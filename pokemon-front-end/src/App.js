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

//Use Tailwind for styling!!!!!!

// export const UserContext = React.createContext()

function App() {
  // let currentUser = true  //for now
  // let otherValue = "test McTest"


  return (
    <div className="App">

      <PokerMain />

      {/* <Login /> */}
      {/* <Test /> */}
    </div>
    // </UserContext.Provider>

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
