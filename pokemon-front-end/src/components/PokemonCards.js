import React, { useState, useEffect } from 'react';
import '../App.css';

import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';


function PokemonCards() {
  // const [cards, setCards] = useState([]);
  // const [card1, setCard1ID] = useState(null);
  // const [card2, setCard2ID] = useState(null);
  // const [card3, setCard3ID] = useState(null);
  // const [card4, setCard4ID] = useState(null);
  // const [card5, setCard5ID] = useState(null);
  let card1 = null

  // useEffect(() => {
  //   setCard1ID(data.cards[findIndex])
  // }, data);

  const generateRandomNumbers = (data) => {
    let arrayOfIds = []
    let randomCard = null
    let findIndex = null

    // let randomCard = null

    let cards = data.cards
    console.log("cards", cards)
    // console.log("Length", cards.length)

    randomCard = Math.floor(Math.random() * (cards.length))
    console.log("randomCard", randomCard)

    card1 = cards[randomCard]
    console.log("card1", card1)


    // for (let i = 0; i < 100; i++) {
    //   randomCard = Math.floor(Math.random() * (cards.length))
    //   console.log("randomCard", randomCard)
    // }




    // cards.map(card => {
    //   arrayOfIds.push(parseInt(card.id))
    // })
    // console.log("arrayOfIds", arrayOfIds)

    // for (let i = 0; i < 5; i++) {
    //   console.log("test i:", i)
    // }

    // randomID = Math.floor(Math.random() * (arrayOfIds.length))
    // console.log("randomID", randomID)

    // findIndex = arrayOfIds.indexOf(randomID)
    // console.log("findIndex which should be one less", findIndex)

    // card1 = cards[findIndex]
    // // setCard1ID(data.cards[findIndex])
    // console.log("card1", card1)

    // arrayOfIds.splice(findIndex, 1)
    // console.log("arrayOfIds After Splice", arrayOfIds)

    console.log("----------------------------")


    // if (arrayOfIds.length > 2) {
    //   let tempIndex = null
    //   for (let i = 0; i <= 4; i++) {
    //     tempIndex = Math.floor(Math.random() * (arrayOfIds.length))
    //     console.log(tempIndex)
    //   }
    // } else {
    //   console.log("Check to see if Ace and show message if win or lose")
    // }

    // arrayOfIds.map(index => {

    // })

    // console.log(data)
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
            <div className="card"> {card1.name} </div>
            {/* <div className="card"> {data.cards[1].name} </div>
            <div className="card"> {data.cards[2].name} </div>
            <div className="card"> {data.cards[3].name} </div>
            <div className="card"> {data.cards[4].name} </div> */}
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