import { useEffect, useState } from 'react'
import PokemonCard from "./Components/PokemonCard"
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await res.json();

      setPokemons(data.results);
    };

    getPokemons();
  }, []);
  console.log(pokemons);

  return (
    <div>
      {pokemons.length ? <PokemonCard url={pokemons[0].url}></PokemonCard> : "Cargando contenido..."}
    </div>
  );
}

export default App;
