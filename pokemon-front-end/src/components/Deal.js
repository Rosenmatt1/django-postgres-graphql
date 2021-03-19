import React, { useState, useEffect } from 'react';
import '../App.css';



// import Register from './components/Auth/Register.js'
// import Login from './components/Auth/Login.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

function Deal() {
  // const [count, setCount] = useState(52);
 

  // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
    
//   });

  return (
    <div className="deal">
      Deal
    </div>
  );
}


// const DEAL_MUTATION = gql`
//   mutation {
//     resetDeck {
//       card {
//         name
//         suit
//         color
//         active 
//         used
//       }
//     }
//   }
// `


export default Deal;