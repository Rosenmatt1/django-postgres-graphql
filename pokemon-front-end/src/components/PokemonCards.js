import React, { useState, useEffect } from 'react';
import '../App.css';
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'


function PokemonCards(data) {
  // console.log("CARDS FROM DEAL", data.cards)
  let cards = data.cards || null

  return cards && (
    <div className="cards-grid" >
      {cards.map(card => (
        <div>
          <div className="card" key={card.id} >
            <div className={`${card.color}`}> {card.name} </div>
            <div className={`${card.color}`}> {card.suit} </div>
          </div>
        </div>
      ))}
    </div >

    // <div className="cards-grid" >
    //   <div className="card" >
    //     <div> Ace </div>
    //   </div>
    // </div >
  );
}


export default PokemonCards