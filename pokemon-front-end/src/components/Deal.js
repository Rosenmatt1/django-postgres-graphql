import React, { useState, useEffect } from 'react';
import '../App.css';

import PokemonCards from './PokemonCards.js';
import Counter from './Counter.js';
import WinOrLose from './WinOrLose.js';
import Reset from './Reset.js';
import Loader from './Shared/Loader.js';
import Error from './Shared/Error.js';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_CARDS_QUERY } from './PokerMain.js';


function Deal(data) {
  console.log("RENDER ALL")
  const [winner, setWinner] = useState(false);
  let cards = data.data.cards
  let card = null
  let activeCards = []
  let randomIndex = null


  const generateRandomCards = async (dealHand) => {
    if (cards.length > 2) {
      for (let i = 0; i <= 4; i++) {
        randomIndex = Math.floor(Math.random() * (cards.length))
        card = cards[randomIndex]
        activeCards.push(card)
        cards.splice(randomIndex, 1)
      }
      await dealHand({ variables: { card1Id: parseInt(activeCards[0].id), card2Id: parseInt(activeCards[1].id), card3Id: parseInt(activeCards[2].id), card4Id: parseInt(activeCards[3].id), card5Id: parseInt(activeCards[4].id) } })
      activeCards = []
    } else if (cards.length == 2) {
      activeCards.push(cards[0])
      activeCards.push(cards[1])
      console.log("Game Over")
      await dealHand({ variables: { card1Id: parseInt(activeCards[0].id), card2Id: parseInt(activeCards[1].id) } })
      // activeCards = []
      console.log("ActiveCards!", activeCards)
      checkWin(cards)
    }
  }


  const checkWin = (cards) => {
    if (cards[0].name === "Ace" || cards[1].name === "Ace") {
      console.log("You Win")
      setWinner(true)
    } else {
      console.log("You Lose Sucker")
      setWinner(false)
    }
  }


  return (
    <Mutation
      mutation={cards.length > 2 ? DEAL_MUTATION : LAST_DEAL_MUTATION}
      onCompleted={data => {
        console.log("Deal Mutation worked!!!!")
      }}
      // update={handleUpdateCache}
      refetchQueries={() => [{ query: GET_CARDS_QUERY }]} //could also use graphQL subscriptions
    >
      {(dealHand, { loading, error }) => {
        if (error) return <Error error={error} />
        return (
          <div className="junk">
            <div className="dealContainer" onClick={() => generateRandomCards(dealHand)}> <div className="deal"> Deal </div> </div>
            <Counter data={data} />
            <PokemonCards cards={activeCards} />
            {cards.length == 0 && <WinOrLose winner={winner} />}
            <Reset />
          </div>
        )
      }}
    </Mutation>
  );
}

// { if (cards.length > 2) {
//   return (
//     <Mutation
//       mutation={DEAL_MUTATION }
//       onCompleted={data => {
//         console.log("Deal Mutation worked!!!!")
//       }}
//       // update={handleUpdateCache}
//       refetchQueries={() => [{ query: GET_CARDS_QUERY }]} //could also use graphQL subscriptions
//     >
//       {(dealHand, { loading, error }) => {
//         if (error) return <Error error={error} />
//         return (
//           <div>
//             <div className="dealContainer" onClick={() => generateRandomCards(dealHand)}> <div className="deal"> Deal </div> </div>
//             <Counter data={data} />
//             <PokemonCards cards={activeCards} />
//           </div>
//         )
//       }}
//     </Mutation>
//   );
//   } else {
//     return (
//       <Mutation
//         mutation={LAST_DEAL_MUTATION}
//         onCompleted={data => {
//           console.log("Deal Mutation worked!!!!")
//         }}
//         // update={handleUpdateCache}
//       >
//         {(dealHand, { loading, error }) => {
//           if (error) return <Error error={error} />
//           return (
//             <div>
//               <div className="dealContainer" onClick={() => generateRandomCards(dealHand)}> <div className="deal"> Deal </div> </div>
//               <Counter data={data} />
//               <PokemonCards cards={activeCards} />
//             </div>
//           )
//         }}
//       </Mutation>
//     );
//   }
// }
// }


const DEAL_MUTATION = gql`
  mutation($card1Id: Int!, $card2Id: Int!, $card3Id: Int, $card4Id: Int, $card5Id: Int) {
    dealHand(
      card1Id: $card1Id
      card2Id: $card2Id
      card3Id: $card3Id
      card4Id: $card4Id
      card5Id: $card5Id
      ) {
      card1 {
        name
        suit
        active 
        used
      }
      card2 {
        name
        suit
        active 
        used
      }
      card3 {
        name
        suit
        active 
        used
      }
      card4 {
        name
        suit
        active 
        used
      }
      card5 {
        name
        suit
        active 
        used
      }
    }
  }
`

const LAST_DEAL_MUTATION = gql`
  mutation($card1Id: Int!, $card2Id: Int!) {
    dealHand(
      card1Id: $card1Id
      card2Id: $card2Id
      ) {
      card1 {
        name
        suit
        active 
        used
      }
      card2 {
        name
        suit
        active 
        used
      }
    }
  }
`

export default Deal;