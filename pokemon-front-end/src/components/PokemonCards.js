import React, { useState, useEffect } from 'react';
import '../App.css';
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';


function PokemonCards(data) {
  console.log("CARDS FROM DEAL", data.cards)
  let cards = data.cards || null
  // const [cards, setCards] = useState([]);
  // const [card1, setCard1ID] = useState(null);
  // const [card2, setCard2ID] = useState(null);
  // const [card3, setCard3ID] = useState(null);
  // const [card4, setCard4ID] = useState(null);
  // const [card5, setCard5ID] = useState(null);
  // let card1 = null
  // let card2 = null
  // let card3 = null
  // let card4 = null
  // let card5 = null

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {

  // }, [cards]);

  return cards && (
    <div className="cards-grid" >
      {cards.map(card => (
        <div key={card.id} >
          <div className="card"> {card.name} </div>
        </div>
      ))}
    </div >
  );
}


export default PokemonCards