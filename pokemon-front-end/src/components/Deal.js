import React, { useState, useEffect } from 'react';
import '../App.css';

import PokemonCards from './PokemonCards.js'
import Counter from './Counter.js'
import Reset from './Reset.js'
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

function Deal(data) {
  console.log("DATA!!", data)
  let cards = data.data.cards

  return (
    <div className="deal">
      <Mutation
        mutation={DEAL_MUTATION}
        variables={{ card1Id: 1 }}
        onCompleted={data => {
          // randomCards()
          console.log("it worked!!!!")
        }}
      // update={handleUpdateCache}
      // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}  //could also use graphQL subscriptions
      >
        {(dealHand, { loading, error }) => {
          if (error) return <Error error={error} />
          return (
            <div>
              Deal
            </div>
          )
        }}
      </Mutation>
    </div>
  );
}

const DEAL_MUTATION = gql`
  mutation($card1Id: Int!) {
    dealHand(card1Id: $card1Id) {
      card1 {
        name
        suit
        color
        active 
        used
      }
    }
  }
`

export default Deal;