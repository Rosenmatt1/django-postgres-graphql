import React, { useState, useEffect } from 'react';
import '../App.css';

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_CARDS_QUERY } from './PokerMain.js';


function Reset() {
  return (
    <Mutation
      mutation={RESET_MUTATION}
      onCompleted={data => {
        console.log("Reset Mutation worked!!!")
      }}
    // update={handleUpdateCache}
    refetchQueries={() => [{ query: GET_CARDS_QUERY }]} //could also use graphQL subscriptions
    >
      {(resetDeck, { loading, error }) => {
        if (error) return <Error error={error} />
        return (
          <div className="resetContainer" onClick={() => resetDeck()}>
            <div className="reset"> Reset </div>
          </div>
        )
      }}
    </Mutation>
  );
}


const RESET_MUTATION = gql`
  mutation {
    resetDeck {
      card {
        name
        suit
        color
        active 
        used
      }
    }
  }
`

export default Reset;