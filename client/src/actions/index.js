import axios from "axios";


export const getVideogames = () => {
    return async (dispatch) => {
            const json = await axios.get("http://localhost:3001/videogames");
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data 
            })
    }
    
}

export const getGenres = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export const gameByGenre = (genre) => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_GAME_GENRE',
            payload: json.data.filter(game => game.genres.includes(genre))
        })
    }
}

