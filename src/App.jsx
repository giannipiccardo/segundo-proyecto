import { useEffect, useState } from "react";
import PokemonCard from "./Components/PokemonCard";
import "./App.scss";
import { Link } from "react-router-dom";
import Minicard from "./Components/Minicard";
import Logo from "./img/Pokeball.png";
import Filter from "./img/Arrow.svg";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [boton, setBoton] = useState("a-z");

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await res.json();

      setPokemons(data.results);
    };

    getPokemons();
  }, []);

  function filtrar() {

    if (boton == "a-z") {
      setBoton("#");
      const filtro = [...pokemons].sort((a, b) => {
        
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setPokemons([...filtro]);
    } else {
      setBoton("a-z");
      const filtro = [...pokemons].sort((a, b) => {
        
        if (parseInt(a.url.split("/").at(-2)) < parseInt(b.url.split("/").at(-2))) {
          return -1;
        }
        if (parseInt(a.url.split("/").at(-2)) > parseInt(b.url.split("/").at(-2))) {
          return 1;
        }
        return 0;
      });

      setPokemons([...filtro]);
    }
  }


  // POR QUE NO FUNCIONA???

  // const [filter, setFilter] = useState([...pokemons]);

  // const prueba = [...pokemons];
  // console.log("fsadfasdf", prueba);
  // console.log("filterrrr", filter);

  return (
    <div className="home-container">
      <div className="home-title">
        <div className="pokedex">
          <img src={Logo} alt="Logo" />
          <span>Pokédex</span>
        </div>
        <button onClick={() => filtrar()} className="home-filters">
          <span>{boton}</span>
          <img src={Filter} alt="Filtro" />
        </button>
      </div>
      <div className="home-input">
        <input type="search" placeholder="🔍 Buscar" />
      </div>
      <div className="home-grid">
        {pokemons.length
          ? pokemons?.map(({ name, url }, index) => (
              <div className="home-pokemon-card" key={index}>
                <Link key={url} to={`/pokemon/${url.split("/").at(-2)}`}>
                  {<Minicard name={name} url={url} />}
                </Link>
              </div>
            ))
          : "Cargando contenido..."}
      </div>
    </div>
  );
}

export default App;
