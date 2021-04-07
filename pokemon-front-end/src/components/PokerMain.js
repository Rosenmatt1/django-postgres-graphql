import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import Reset from './Reset.js'
import Deal from './Deal.js'
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

// import { UserContext, ME_QUERY } from '../../Root';
// import { UserContext } from '../App.js'

function PokerMain() {
  // const { currentUser } = useContext(UserContext);
  // console.log("currentUser", currentUser)
  // const { otherValue } = useContext(UserContext);
  // console.log("otherValue", otherValue)
  return (
    <div >
      <Query query={GET_CARDS_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <Loader />
          if (error) return <Error />

          return <div className="App">
            <Deal data={data} />
            <Reset />
          </div>
        }}
      </Query>
    </div>
  );
}


export const GET_CARDS_QUERY = gql`
 {
  cards {
    id
    name
    suit
    color
    active
    used
  }
 }
`

export default PokerMain;