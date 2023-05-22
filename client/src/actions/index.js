import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_GENRE = 'GET_GAME_GENRE';
export const GET_GAMEDB = 'GET_GAMEDB';
export const GET_GAMEAPI = 'GET_GAMEAPI';
export const GET_NAME_GAMES = 'GET_NAME_GAMES';
export const ORDER_GAMES_BY_RATING = "ORDER_GAMES_BY_RATING";
export const ORDER_GAMES_BY_NAME = "ORDER_GAMES_BY_NAME";
export const CREATE_GAME = "CREATE_GAME";

export const getVideogames = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data 
        })
    }
}

export const getVideogameByID = id => {
    return async dispatch => {
        const gameByID = await axios.get(`http://localhost:3001/videogames/${id}`);

        return dispatch({
            type: GET_GAME_BY_ID,
            payload: gameByID.data,
        });
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export const gameByGenre = (genre) => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/videogames");

        return dispatch({
            type: GET_GAME_GENRE,
            payload: { genre, videogames: json.data}
        })
    }
}

export const getGamesByDB = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_GAMEDB,
            payload: json.data
        })
    }
}

export const getGamesByAPI = () => {
    return async (dispatch) => {
        const json = await axios.get("http://localhost:3001/videogames")
        return dispatch({
            type: GET_GAMEAPI,
            payload: json.data
        })
    }
}

export const getGamesByName = (name) => {
        return async (dispatch) => {
            try {
            const json = await axios.get('http://localhost:3001/videogames?name=' + name)
            return dispatch({
                type: GET_NAME_GAMES,
                payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
    }
}


export const orderGamesByRating = order => {
    return dispatch => {
        return dispatch({
            type: ORDER_GAMES_BY_RATING,
            payload: order,
        });
    }
}

export const orderGamesByName = order => {
    return dispatch => {
        return dispatch({
            type: ORDER_GAMES_BY_NAME,
            payload: order,
        });
    }
}

export const createVideogame = videogame => {
    return async dispatch => {
        const { name, description, platforms, image, year_start, rating, genres } = videogame;

        const gameCreated = await axios.post("http://localhost:3001/videogames", {
            name, description, platforms, image, year_start, rating, genres
        });

        return dispatch({
            type: CREATE_GAME,
            payload: gameCreated,
        });
    }
}
