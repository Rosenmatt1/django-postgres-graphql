import React, { useState, useEffect } from 'react';
import '../App.css';

function WinOrLose({ winner }) {

  return (
    <div className="winorlose">
        <div> {winner ? "YOU WIN!!" : "YOU LOSE SUCKER!"} </div>  
    </div>
  );
}


export default WinOrLose;