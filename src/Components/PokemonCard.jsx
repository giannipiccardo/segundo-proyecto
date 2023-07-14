import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function PokemonCard({ url }) {
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        const getPokemon = async () => {
            const res = await fetch(url);
            const data = await res.json();

            setPokemon(data);
        };

        getPokemon();
    }, []);
    console.log(pokemon);
    return (
        pokemon ? <div>{pokemon.name}</div> : <h1>Loading pokemon</h1>
    );
}

export default PokemonCard;