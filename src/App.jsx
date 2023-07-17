import { useEffect, useState } from 'react'
import PokemonCard from "./Components/PokemonCard"
import './App.scss'
import { Link } from 'react-router-dom';
import Minicard from './Components/Minicard';
import Logo from "./img/Pokeball.png"
import Filter from "./img/Arrow.svg"

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
  // console.log("pokemons", pokemons);

  return (
    <div className='home-container'>
      <div className='home-title'>
        <div className='pokedex'>
          <img src={Logo} alt="Logo" />
          <span>Pokédex</span>
        </div>
        <div className='home-filters'>
          <span>#</span>
          <img src={Filter} alt="Filtro" />
        </div>
      </div>
      <div className='home-input'>
        <input type="search" placeholder='🔍 Buscar' />
      </div>
      <div className='home-grid'>
        {pokemons.length ? pokemons.map(({ name, url }, index) => <div className="home-pokemon-card" key={index}><Link key={url} to={`/pokemon/${url.split('/').at(-2)}`}>{<Minicard name={name} url={url} />}</Link></div>) : "Cargando contenido..."}
      </div>

    </div>
  );
}


export default App;
