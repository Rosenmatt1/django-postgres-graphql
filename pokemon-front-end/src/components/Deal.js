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
  let cards = data.data.cards
  let randomIndex = null
  let card1 = null
  let card2 = null
  let card3 = null
  let card4 = null
  let card5 = null


  const generateRandomCards = (dealHand) => {
    console.log("cards", cards)

    randomIndex = Math.floor(Math.random() * (cards.length))
    // console.log("randomCard", randomIndex)
    card1 = cards[randomIndex]
    cards.splice(randomIndex, 1)
    // console.log("cards after splice", cards)

    randomIndex = Math.floor(Math.random() * (cards.length))
    // console.log("randomCard", randomIndex)
    card2 = cards[randomIndex]
    cards.splice(randomIndex, 1)
    // console.log("cards after splice", cards)

    randomIndex = Math.floor(Math.random() * (cards.length))
    // console.log("randomCard", randomIndex)
    card3 = cards[randomIndex]
    cards.splice(randomIndex, 1)
    // console.log("cards after splice", cards)

    randomIndex = Math.floor(Math.random() * (cards.length))
    // console.log("randomCard", randomIndex)
    card4 = cards[randomIndex]
    cards.splice(randomIndex, 1)
    // console.log("cards after splice", cards)

    randomIndex = Math.floor(Math.random() * (cards.length))
    // console.log("randomCard", randomIndex)
    card5 = cards[randomIndex]
    cards.splice(randomIndex, 1)
    // console.log("cards after splice", cards)

    dealHand({ variables: { card1Id: parseInt(card1.id), card2Id: parseInt(card2.id), card3Id: parseInt(card3.id), card4Id: parseInt(card4.id), card5Id: parseInt(card5.id) } })
  }

  return (
    <div className="deal">
      <Mutation
        mutation={DEAL_MUTATION}
        onCompleted={data => {
          console.log("Deal Mutation worked!!!!")
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

const DEAL_MUTATION = gql`
  mutation($card1Id: Int!, $card2Id: Int!, $card3Id: Int!, $card4Id: Int!, $card5Id: Int!) {
    dealHand(
      card1Id: $card1Id
      card2Id: $card2Id
      card3Id: $card3Id
      card4Id: $card4Id
      card5Id: $card5Id
      ) {
      card1 {
        name
        suit
        active 
        used
      }
      card2 {
        name
        suit
        active 
        used
      }
      card3 {
        name
        suit
        active 
        used
      }
      card4 {
        name
        suit
        active 
        used
      }
      card5 {
        name
        suit
        active 
        used
      }
    }
  }
`

export default Deal;