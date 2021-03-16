import React, { useState, useEffect } from 'react';
import '../App.css';

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

function PokemonCards() {
  const [cards, setCards] = useState([]);
  const [card1, setCard1ID] = useState(null);
  const [card2, setCard2ID] = useState(null);
  const [card3, setCard3ID] = useState(null);
  const [card4, setCard4ID] = useState(null);
  const [card5, setCard5ID] = useState(null);

  const generateRandomNumbers = (data) => {
    let arrayOfIds = []

    data.cards.map(card => {
      arrayOfIds.push(parseInt(card.id))
    })

    if (arrayOfIds.length > 2) {
      let tempIndex = null
      for (let i = 0; i = 4; i++) {
        tempIndex = Math.floor(Math.random() * (arrayOfIds.length))
        console.log(tempIndex)
      }
    } else {
      console.log("Check to see if Ace and show message if win or lose")
    }

    // arrayOfIds.map(index => {
        
    // })

    // console.log(data)
    console.log(arrayOfIds)
    console.log("Length", data.cards.length)
  }

  // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {

    // }, [cards]);

  return (
    <div className="cards-grid" >

      <Query query={GET_ACTIVE_CARDS_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <Loader />
          if (error) return <Error />
          generateRandomNumbers(data)

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