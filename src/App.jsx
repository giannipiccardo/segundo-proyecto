import { useEffect, useState } from 'react'
import PokemonCard from "./Components/PokemonCard"
import './App.css'
import { Link } from 'react-router-dom';

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
  console.log("pokemons", pokemons);

  return (
    <div>
      {pokemons.length ? pokemons.map(({name, url})=><Link key={url} to={`/pokemon/${url.split('/').at(-2)}`}>{name}</Link>) : "Cargando contenido..."}
    </div>
  );
}


export default App;
