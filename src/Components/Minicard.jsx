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

    let color = '';
    
    switch (pokemon?.types[0]?.type?.name) {
        case 'rock':
            color = '#B7B9D0'            
            break;
        case 'water':
            color = '#6493EB'            
            break;  
        case 'grass':
            color = '#74CB48'            
            break;
        case 'psychic':
            color = '#fb5584'            
            break;  
        case 'ice':
            color = '#9AD6DF'            
            break;
        case 'dark':
            color = '#75574C'            
            break;  
        case 'fairy':
            color = '#E69EAC'            
            break;
        case 'flying':
            color = '#A891EC'            
            break;  
        case 'poison':
            color = '#A43E9E'            
            break;
        case 'bug':
            color = '#A7B723'            
            break;  
        case 'fire':
            color = '#F57D31'            
            break;
        case 'electric':
            color = '#F9CF30'            
            break;
        
        case 'dragon':
            color = '#7037FF'
        case 'normal':
            color = '#AAA67F'
        
        case 'fighting':
            color = '#C12239'
            break
        
        case 'ground':
            color = '#DEC168' 
            break
        case 'ghost':
            color = '#70559B' 
            break
        case 'steel':
            color = '#B7D9D0' 
            break
        
        default:
            break;
    }



    return (
        <div style={{border: `1px solid ${color}` }}className="card-container prueba">
            <div style={{color:`${color}` }} className="pokemon-num">{pokemon?.id < 10 ? `00${pokemon?.id}` : `0${pokemon?.id}`}</div>
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