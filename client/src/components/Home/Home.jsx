import React from "react";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, gameByGenre, orderGamesByRating, orderGamesByName, getGamesByDB, getGamesByAPI } from "../../actions";
import { Link } from "react-router-dom";
import Card from '../Cards/Cards'
import Pagination from '../Paginated/Paginated'
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

const Home = () => {
    

    
    const dispatch = useDispatch()

    const allVideogames = useSelector ((state) => state.videogames)
    const allGenres = useSelector ((state) => state.genres)

    const [page, setPage] = useState(1)
    const gamebyPage = 15

    const indexOfLastGame =  page * gamebyPage
    const indexOfFirstGame = indexOfLastGame - gamebyPage
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)


    const paginated = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch])

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(getVideogames());
    }

    const handlerChange = (event) => {
        const genre = event.target.value
        dispatch(gameByGenre(genre))
    }

    const handleRatingOrder = event => {
        const { target: { value } } = event;

        value === "rating-desc" && dispatch(orderGamesByRating("DESC"));
        value === "rating-asc" && dispatch(orderGamesByRating());
    }

    const handleABCOrder = event => {
        const { target: { value } } = event;

        value === "abc-desc" && dispatch(orderGamesByName("DESC"));
        value === "abc-asc" && dispatch(orderGamesByName());
    }

    const handleGameFilter = event => {
        const { target: { value } } = event;

        value === "all" && dispatch(getVideogames());
        value === "api" && dispatch(getGamesByAPI());
        value === "db" && dispatch(getGamesByDB());
    }

    return (

            <div>
                                <div className='boxfilter1'>
                    <button className='button' onClick={event => {handleClick(event)}}>RELOAD VIDEOGAMES</button>
                    <SearchBar className=''/>
                        </div>
                    <h1 className='title'>Gamer Zone</h1>

            <div>
                <Link to= '/videogame'><p className='creatett'>⇨⇨CREATE YOUR VIDEOGAME⇦⇦</p></Link>
            </div>

                <div className='boxfilter'>
                <div className="box">
                    <label className='filter'>Orden por rating</label>
                    <select onChange={event => handleRatingOrder(event)}>
                        <option value= 'Todos' >Todos</option>
                        <option value= 'rating-asc' >Rating mayor</option>
                        <option value= 'rating-desc' >Rating menor</option>
                    </select>
                    </div>

                    <div className="box">
                    <label className='filter'>Orden por letra</label>
                    <select className='' onChange={event => handleABCOrder(event)}>
                        <option value= 'todos'>Todos</option>
                        <option value= 'abc-asc'>A - Z</option>
                        <option value= 'abc-desc'>Z - A</option>
                    </select>
                </div>
                    
                <div className="box">
                        <label className='filter'>Generos</label>
                        <select className='' onChange={event => handlerChange(event)}>
                            <option value= 'todos'>Todos</option>
                            {
                            allGenres.map((genre, index) => {
                                return(
                                    <option key={index} value={genre.name}>{genre.name}</option>
                                )
                                })
                            }
                        </select>
                    </div>
                    
                    <div className="box">
                        <label className='filter'>Origen</label>
                        <select  onChange={event => handleGameFilter(event)}>
                            <option value= 'all'>Todos</option>
                            <option value= 'api'>Api Gamees</option>
                            <option value= 'db'>Data Base Games</option>
                        </select>
                    </div>
                </div>
                    <div>
                    {
                        currentGames && currentGames.map(game => {
                            return(
                            <Link to={`/videogame/${game.id}`}>
                                <Card name= { game.name } image= { game.background_image } genres={ game.genres } rating={game.rating} key={game.id} />
                            </Link>
                        )})
                    
                    }
                    </div>
                <div className='navbar'>
                <Pagination 
                    gameByPage={gamebyPage}
                    allVideogames={allVideogames.length}
                    paginated={paginated}
                />
                </div>
            </div>
            
    )
}


export default Home;
