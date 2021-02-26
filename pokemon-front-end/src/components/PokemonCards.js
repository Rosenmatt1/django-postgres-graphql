import React, { useState, useEffect } from 'react';
import '../App.css';

function PokemonCards() {
//   const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
    
//   });

  return (
    <div className="cards-grid">
      <div className="card"> PokemonCard1 </div>
      <div className="card"> PokemonCard2 </div>
      <div className="card"> PokemonCard3 </div>
      <div className="card"> PokemonCard4 </div>
      <div className="card"> PokemonCard5 </div>
    </div>
  );
}


export default PokemonCards