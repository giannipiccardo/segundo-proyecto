import { useEffect, useState } from 'react'
import PokemonCard from "./Components/PokemonCard"
import './App.css'
import { useParams } from 'react-router-dom';

function App(route) {
  const [pokemons, setPokemons] = useState([]);
  const { pokemonId } = useParams()
  const pokemon = route.find((est) => est.url == pokemonId)
  console.log(route)

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await res.json();

      setPokemons(data.results);
    };

    getPokemons();
  }, []);
  console.log("pokemons", pokemons);

  return (
    <div>
      {pokemons.length ? <PokemonCard url={pokemons[0].url}></PokemonCard> : "Cargando contenido..."}
    </div>
  );
}
import { useParams } from 'react-router-dom';

export default App;
