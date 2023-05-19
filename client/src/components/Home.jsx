import React from "react";
import { UseState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, gameByGenre } from "../actions";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()

    const allVideogames = useSelector ((state) => state.videogames)
    const allGenres = useSelector ((state) => state.genres)

    useEffect (() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[])

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(getVideogames());
    }

    const hanlderChange = (event) => {
        const genre = event.target.value
        dispatch(gameByGenre(genre))
    }

    return (
        <div>
            <Link to= '/videogame'>Crear videojuego</Link>
            <h1>AGUANTEN LOS VIDEOJUEGOS</h1>
            <button onClick={event => {handleClick(event)}}>
                Volver a cargar los videojuegos
            </button>
            <div>
                <select>
                    <option value= 'asc' >Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select onChange={hanlderChange}>
                    {
                        allGenres.map(genre => {
                            return(
                                <option value={genre.name}>{genre.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
            
    )
}


export default Home;