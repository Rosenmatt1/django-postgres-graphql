import React, { useState, useEffect } from 'react';
import '../App.css';

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_CARDS_QUERY } from './PokerMain.js';


function PlayAgain() {
  return (
    <Mutation
      mutation={PLAY_AGAIN_MUTATION}
      onCompleted={data => {
        console.log("PlayAgain Mutation worked!!!")
      }}
    refetchQueries={() => [{ query: GET_CARDS_QUERY }]} //could also use graphQL subscriptions
    >
      {(resetDeck, { loading, error }) => {
        if (error) return <Error error={error} />
        return (
          <div className="playAgainContainer" onClick={() => resetDeck()}>
            <div className="playAgain"> Play Again </div>
          </div>
        )
      }}
    </Mutation>
  );
}

const PLAY_AGAIN_MUTATION = gql`
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


export default PlayAgain;