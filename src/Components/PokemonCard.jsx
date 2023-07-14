import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonCard.css";
import arrowleft from "../img/arrow-left.svg";
import weight from "../img/Weight.svg";

import height from "../img/Height.svg";

function PokemonCard() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      setPokemon(data);
    };

    getPokemon();
  }, []);

  console.log("pokemon", pokemon);

  return (
    <>
      <div className="header-container">
        <button>
          <img src={arrowleft} alt="lala" />
        </button>
        {pokemon ? (
          <span className="poke-name">{pokemon?.name}</span>
        ) : (
          <h1>Loading pokemon</h1>
        )}
        <div className="poke-num">{`00${pokemon?.id}`}</div>
      </div>
      <img
        id="poke-img"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
        alt=""
      />

      <div className="info-container">
        <div className="poke-types">
          {pokemon?.types.map((t) => (
            <span key={t.type.name}>{t?.type?.name} </span>
          ))}
        </div>
        <h2>About</h2>
        <div className="about">
          <div className="description ">
            <img className="measure imagen" src={weight} alt="" />
            <span className="measure">{`${pokemon?.weight}kg`}</span>
            <span className="measure">Weight</span>
          </div>
          <div className="description borders ">
            <img className="measure imagen" src={height} alt="" />
            <span className="measure">{`${pokemon?.height / 10}m`}</span>
            <span className="measure">Height</span>
          </div>
          <div className="description abilities">
            {pokemon?.abilities.map((t) => (
              <span key={t.ability.name}>{t?.ability?.name} </span>
            ))}

            <span>Moves</span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          laudantium, iste unde vero{" "}
        </p>

        <h2>Base Stats</h2>

        <div className="stats-container">
          <div className="stats-names">
            <span>HP</span>
            <span>ATK</span>
            <span>DEF</span>
            <span>SATK</span>
            <span>SDEF</span>
            <span>SPD</span>
          </div>
          <div className="stats-numbers">
          {pokemon?.stats.map((t,index) => (
            <p key={index}>
              <span >{`${t?.base_stat>99 ? '' : '0'}${t?.base_stat}`}</span>
              <div className="progress">
              <p style={{ width: `${t?.base_stat/2}%` }}className='stats-bars-progress'></p> </div>
               </p>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default PokemonCard;
