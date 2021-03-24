import React, { useState, useEffect, useContext } from 'react';
import '../App.css';

import PokemonCards from './PokemonCards.js'
import Counter from './Counter.js'
import Reset from './Reset.js'
import Deal from './Deal.js'
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

// import { UserContext, ME_QUERY } from '../../Root';
// import { UserContext } from '../App.js'


//hitting reset is updating the backend but not the front end. **********************************************

function PokerMain() {
  // const { currentUser } = useContext(UserContext);
  // console.log("currentUser", currentUser)
  // const { otherValue } = useContext(UserContext);
  // console.log("otherValue", otherValue)

  return (
    <div className="pokerMain">
      <Query query={GET_CARDS_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <Loader />
          if (error) return <Error />

          return <div>
            <Counter />
            <Deal data={data} />
            <Reset />
          </div>
        }}
      </Query>
    </div>
  );
}


const GET_CARDS_QUERY = gql`
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