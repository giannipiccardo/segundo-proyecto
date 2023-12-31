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
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState([]);
  let desde = 0;
  const [hasta, setHasta] = useState(20);


  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${hasta}&offset=${desde}`);
      const data = await res.json();

      setPokemons(data.results);
    };

    getPokemons();

  }, [hasta]);

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
        if (
          parseInt(a.url.split("/").at(-2)) < parseInt(b.url.split("/").at(-2))
        ) {
          return -1;
        }
        if (
          parseInt(a.url.split("/").at(-2)) > parseInt(b.url.split("/").at(-2))
        ) {
          return 1;
        }
        return 0;
      });

      setPokemons([...filtro]);
    }
  }
  useEffect(() => {
    setFiltro(pokemons);
  }, [pokemons])

  function buscar(ev) {
    const resultado = pokemons.filter((p) => {
      if (ev.target.value == "") return p;
      return p.name.toLowerCase().includes(ev.target.value.toLowerCase());
    });
    setFiltro(resultado);

  }

  const cargarMas = () => setHasta(hasta+10); 


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight 
    ) {
      cargarMas();
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasta]);

  return (
    <div className="home-container">
      <div className="home-title">
        <div className="pokedex">
          <img src={Logo} alt="Logo" />
          <span>Pokédex rama2</span>
        </div>
        <button onClick={() => filtrar()} className="home-filters">
          <span>{boton}</span>
          <img src={Filter} alt="Filtro" />
        </button>
      </div>
      <div className="home-input">
        <input
          onChange={buscar}
          type="text"
          placeholder="🔍 Buscar"
        />
      </div>
      <div className="home-grid">
        {pokemons.length
          ? filtro?.map(({ name, url }, index) => (
            <div className="home-pokemon-card" key={index}>
              <Link key={url} to={`/pokemon/${url.split("/").at(-2)}`}>
                {<Minicard name={name} url={url} />}
              </Link>
            </div>
          ))
          : "Cargando contenido..."}
      </div>
      <button className='cargar-mas' onClick={()=>cargarMas()}>Cargar mas</button>
    </div>
  );
}

export default App;
