import './App.css';
import PokemonCards from './components/PokemonCards.js'
import Counter from './components/Counter.js'
import Reset from './components/Reset.js'


//Use Tailwind for styling!!!!!!

function App() {
  return (
    <div className="App">
      <Counter />
      <PokemonCards />
      <Reset />
    </div>
  );
}

export default App;
