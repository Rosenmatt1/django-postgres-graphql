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
  // console.log("DATA!!", data)
  let cards = data.data.cards

  // let arrayOfIds = []
  let randomCard = null
  let findIndex = null
  let card1 = null
  let card1ID = null

  // card1 = cards[randomCard]
  // console.log("card1", card1)

  const generateRandomCards = (dealHand) => {
    console.log("cards", cards)
    // console.log("Length", cards.length)

    randomCard = Math.floor(Math.random() * (cards.length))
    console.log("randomCard", randomCard)

    // findIndex = cards.indexOf(randomCard)
    // console.log("findIndex which should be one less", findIndex)

    card1 = cards[randomCard]
    card1ID = parseInt(card1.id)
    console.log("card1 id!!!!!", typeof(card1ID))
    dealHand({ variables: { card1Id: card1ID  } })
  }

  return (
    <div className="deal">
      <Mutation
        mutation={DEAL_MUTATION}
        // variables={{ card1Id: card1ID }}
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
            <div onClick={() => generateRandomCards(dealHand)}>
              Deal
            </div>
          )
        }}
      </Mutation>
    </div>
  );
}

// generateRandomCards(dealHand, cards)

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