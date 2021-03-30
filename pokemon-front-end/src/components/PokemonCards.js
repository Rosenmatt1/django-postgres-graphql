import React, { useState, useEffect } from 'react';
import '../App.css';
import Loader from './Shared/Loader.js'
import Error from './Shared/Error.js'


function PokemonCards(data) {
  let cards = data.cards || null
  console.log("CARDS FROM DEAL", cards)

  return cards && (
    <div className="cards-grid" >
      {cards.map(card => (
        <div key={card.id}>
          <div className="card"  >
            <div className={`${card.color}`}> {card.name} </div>
            <div className={`${card.color}`}> {card.suit} </div>
          </div>
        </div>
      ))}
    </div >
  );
}


export default PokemonCards