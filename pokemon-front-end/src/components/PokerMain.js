import React, { useState, useEffect } from 'react';
import '../App.css';

import PokemonCards from './PokemonCards.js'
import Counter from './Counter.js'
import Reset from './Reset.js'
import Deal from './Deal.js'

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

let randomCards = (dealHand) => {
  console.log("dealt")
  dealHand(1)
}

function PokerMain() {
  return (
    <div className="pokerMain">
      <Query query={GET_ACTIVE_CARDS_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <Loader />
          if (error) return <Error />
          // generateRandomNumbers(data)

          return <div>
            <Mutation
              mutation={DEAL_MUTATION}
              variables={{ card1Id: 1}}
              onCompleted={data => { 
                randomCards()
                console.log("it worked!!!!") 
              }}
            // update={handleUpdateCache}
            // refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}  //could also use graphQL subscriptions
            >
              {(dealHand, { loading, error }) => {
                if (error) return <Error error={error} />
                return (
                  <div>
                    <Counter />
                    <PokemonCards data={data} />
                    <Deal onClick={() => randomCards(dealHand)} />
                    <Reset />
                  </div>
                )
              }}
            </Mutation>
          </div>

        }}
      </Query>
    </div>
  );
}


const GET_ACTIVE_CARDS_QUERY = gql`
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


export default PokerMain;