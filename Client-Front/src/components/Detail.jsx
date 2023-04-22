import axios from "axios";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// const URL_BASE = `http://localhost:3001/rickandmorty/character`;
// const APY_KEY = '7c4242104a73.0ac1402f68f536a7a8dc';

export default function Detail() {
    const { id } = useParams();
    const [character, setCharacter] = useState({})

    
    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

    return(
        <div>
            <h2>{character?.name}</h2>
            <h2>{character?.status}</h2>
            <h2>{character?.species}</h2>
            <h2>{character?.gender}</h2>
            <h2>{character?.origin?.name}</h2>
            <img src={character?.image} alt={character?.name} />
        </div>
    )
}