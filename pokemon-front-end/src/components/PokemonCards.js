import React, { useState, useEffect } from 'react';
import '../App.css';

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

function PokemonCards() {
  const [cards, setCards] = useState([]);
  // const [card1, setCard1] = useState("PokemonCard1");
  // const [card2, setCard2] = useState("PokemonCard2");
  // const [card3, setCard3] = useState("PokemonCard3");
  // const [card4, setCard4] = useState("PokemonCard4");
  // const [card5, setCard5] = useState("PokemonCard5");

  // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {

    // }, [cards]);

  return (
    <div className="cards-grid" >

      <Query query={GET_ACTIVE_CARDS_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <Loader />
          if (error) return <Error />

          return <div>
            <div className="card"> {data.cards[0].name} </div>
            <div className="card"> {data.cards[1].name} </div>
            <div className="card"> {data.cards[2].name} </div>
            <div className="card"> {data.cards[3].name} </div>
            <div className="card"> {data.cards[4].name} </div>
          </div>
        }}
      </Query>

    </div >
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


export default PokemonCards