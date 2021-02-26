import React, { useState, useEffect } from 'react';
import '../App.css';

function PokemonCards() {
  // const [cards, setCards] = useState("");
  const [card1, setCard1] = useState("PokemonCard1");
  const [card2, setCard2] = useState("PokemonCard2");
  const [card3, setCard3] = useState("PokemonCard3");
  const [card4, setCard4] = useState("PokemonCard4");
  const [card5, setCard5] = useState("PokemonCard5");

  // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
    
//   });

  return (
    <div className="cards-grid">
      <div className="card"> {card1} </div>
      <div className="card"> {card2} </div>
      <div className="card"> {card3} </div>
      <div className="card"> {card4}</div>
      <div className="card"> {card5} </div>
    </div>
  );
}


export default PokemonCards