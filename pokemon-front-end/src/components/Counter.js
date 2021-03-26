import React, { useState, useEffect } from 'react';
import '../App.css';

function Counter(data) {
  let {cards} = data.data.data

  return (
    <div className="counterContainer">
      <div className="counter">
        Cards Left
        {cards.length}
      </div>
    </div>
  );
}


export default Counter;