import React, { useState, useEffect } from 'react';
import '../App.css';

import PokemonCards from './PokemonCards.js'
import Counter from './Counter.js'

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { GET_CARDS_QUERY } from './PokerMain.js';

function Deal(data) {
  let cards = data.data.cards
  let card = null
  let activeCards = []
  let randomIndex = null
  let card1 = null
  let card2 = null
  let card3 = null
  let card4 = null
  let card5 = null


  const generateRandomCards = async (dealHand) => {
    console.log("cards", cards)
    if (cards.length > 2) {
      // randomIndex = Math.floor(Math.random() * (cards.length))
      // card1 = cards[randomIndex]
      // cards.splice(randomIndex, 1)

      // randomIndex = Math.floor(Math.random() * (cards.length))
      // card2 = cards[randomIndex]
      // cards.splice(randomIndex, 1)

      // randomIndex = Math.floor(Math.random() * (cards.length))
      // card3 = cards[randomIndex]
      // cards.splice(randomIndex, 1)

      // randomIndex = Math.floor(Math.random() * (cards.length))
      // card4 = cards[randomIndex]
      // cards.splice(randomIndex, 1)

      // randomIndex = Math.floor(Math.random() * (cards.length))
      // card5 = cards[randomIndex]
      // cards.splice(randomIndex, 1)

      for (let i = 0; i <= 4; i++) {
        randomIndex = Math.floor(Math.random() * (cards.length))
        card = cards[randomIndex]
        activeCards.push(card)
        cards.splice(randomIndex, 1)
        // console.log("cards after last splice", cards)
        // console.log("cards LENGTH after last splice", cards.length)
      }
      // console.log("cards after last splice", cards)
      // console.log("cards LENGTH after last splice", cards.length)
      await dealHand({ variables: { card1Id: parseInt(activeCards[0].id), card2Id: parseInt(activeCards[1].id), card3Id: parseInt(activeCards[2].id), card4Id: parseInt(activeCards[3].id), card5Id: parseInt(activeCards[4].id) } })
      activeCards = []
    } else {
      console.log("Game Over")
      if (cards[0].name === "Ace" || cards[1].name === "Ace") {
        console.log("You Win")
      } else {
        console.log("You Lose Sucker")
      }
    }
  }

  // dealHand({ variables: { card1Id: parseInt(activeCards[0].id), card2Id: parseInt(activeCards[1].id), card3Id: parseInt(activeCards[2].id), card4Id: parseInt(activeCards[3].id), card5Id: parseInt(activeCards[4].id) } })

  return (
    <div className="deal">
      <Mutation
        mutation={DEAL_MUTATION}
        onCompleted={data => {
          console.log("Deal Mutation worked!!!!")
        }}
      // update={handleUpdateCache}
      refetchQueries={() => [{ query: GET_CARDS_QUERY }]}  //could also use graphQL subscriptions
      >
        {(dealHand, { loading, error }) => {
          if (error) return <Error error={error} />
          return (
            <div>
              <div className="deal" onClick={() => generateRandomCards(dealHand)}> Deal </div>
              <Counter data={data}/>
              <PokemonCards cards={activeCards} />
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