import './App.css';
import PokemonCards from './components/PokemonCards.js'
import Counter from './components/Counter.js'
import Reset from './components/Reset.js'
import Test from './components/Test.js'

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
// import { UserContext } from '../../Root';


//Use Tailwind for styling!!!!!!

function App() {
  return (
    <div className="App">

      <Query query={GET_POKEMON_QUERY} >
        {({ data, loading, error }) => {
          if (loading || !data) return <div>Loading</div>
          if (error) return <div>Error</div>
          // console.log(data.pokemon[0].name)

          return <div>{JSON.stringify(data)}</div>

        }}
      </Query>

      <Counter />
      <PokemonCards />
      <Reset />

      {/* <Test /> */}

    </div>
  );
}

const GET_POKEMON_QUERY = gql`
    {
        pokemon {
            id 
            name
            abilities 
            powerLevel
        }
    }
`


// const UPDATE_TRACK_MUTATION = gql`
//   mutation($trackId: Int!, $title: String, $url: String, $description: String) {
//     updateTrack(
//       trackId: $trackId
//       title: $title
//       url: $url
//       description: $description
//     ) {
//       track {
//         id
//         title
//         description
//         url
//       }
//     }
//   }
// `


export default App;
