import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Minicard.scss"

function Minicard({ name, url }) {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        const getPokemon = async () => {
            const res = await fetch(url);
            const data = await res.json();

            setPokemon(data);
        };

        getPokemon();
    }, []);
    // console.log("pokemonnnnn", pokemon);

    return (
        <div className="card-container">
            <div className="pokemon-num">{`00${pokemon?.id}`}</div>
            <img
                // id="pokemon-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                alt=""
                className="pokemon-img"
            />
            <div className={`pokemon-name ${pokemon?.types[0]?.type?.name}`}>
                {pokemon ? (
                    <span>{name}</span>
                ) : (
                    <h1>Loading pokemon</h1>
                )}
            </div>
        </div >
    );
}

export default Minicard;