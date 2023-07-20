import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonCard.scss";
import arrowleft from "../img/arrow-left.svg";
import weight from "../img/Weight.svg";
import { useNavigate } from "react-router-dom";
import frame from '../img/Frame.svg'

import height from "../img/Height.svg";

function PokemonCard() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      setPokemon(data);
    };
    const getDescription = async () => {
      const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      const dato = await resultado.json();

      setDescription(dato)

    }

    getDescription();

    getPokemon();
  }, [pokemonId]);

  console.log(description);
  const navigate = useNavigate();

  const next = parseInt(pokemonId) + 1
  const back = parseInt(pokemonId) - 1

  return (
    <div className={`global ${pokemon?.types[0]?.type?.name}`}>
      <div className="header-container">
        <button onClick={() => { navigate("/") }}>
          < img src={arrowleft} alt="lala" />
        </button>
        {pokemon ? (
          <span className="poke-name">{pokemon?.name}</span>
        ) : (
          <h1>Loading pokemon</h1>
        )}
        <div className="poke-num">{`00${pokemon?.id}`}</div>
      </div >
      <img
        id="poke-img"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
        alt=""
      />
      <button className='button-next' onClick={() => { navigate(`/pokemon/${next}`) }}><img src={frame} alt="" /></button>
      {pokemon?.id != 1 && <button className='button-back' onClick={() => { navigate(`/pokemon/${back}`) }}><img src={frame} alt="" /></button>}
      <div className="container">
        <div className="info-container">
          <div className="poke-types">
            {pokemon?.types.map((t, index) => (
              <div className={`pastilla ${pokemon?.types[index]?.type?.name}`} key={t.type.name}>{t?.type?.name} </div>
            ))}
          </div>
          <h2 className={`${pokemon?.types[0]?.type?.name}-color`}>About</h2>
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
          <p>{description?.flavor_text_entries[0]?.flavor_text}</p>


          <h2 className={`${pokemon?.types[0]?.type?.name}-color`}>Base Stats</h2>

          <div className="stats-container">
            <div className={`stats-names ${pokemon?.types[0]?.type?.name}-color`}>
              {/* <div className={`stats-bars-progress ${pokemon?.types[0]?.type?.name}`}> */}
              <span>HP</span>
              <span>ATK</span>
              <span>DEF</span>
              <span>SATK</span>
              <span>SDEF</span>
              <span>SPD</span>
            </div>
            <div className="stats-numbers">
              {pokemon?.stats.map((t, index) => (
                <div key={index}>
                  <span >{`${t?.base_stat > 99 ? '' : '0'}${t?.base_stat}`}</span>
                  <div className="progress">
                    <p style={{ width: `${t?.base_stat / 2}%` }} className={`stats-bars-progress ${pokemon?.types[0]?.type?.name}`}></p> </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
