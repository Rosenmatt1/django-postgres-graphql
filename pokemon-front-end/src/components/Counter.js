import React, { useState, useEffect } from 'react';
import '../App.css';

function Counter(data) {
  let { cards } = data.data.data

  return (
    <div className="counterContainer">
      <div className="counter">
        <div> Cards Left </div>
        <div> {cards.length} </div>
      </div>
    </div>
  );
}


export default Counter;