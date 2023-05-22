import { GET_GAME_BY_ID,
    ORDER_GAMES_BY_RATING,
    ORDER_GAMES_BY_NAME,
    CREATE_GAME,
    GET_NAME_GAMES,
    GET_VIDEOGAMES,
    GET_GENRES,
    GET_GAME_GENRE,
    GET_GAMEDB,
    GET_GAMEAPI,
} from "../actions";

const initialState = {
    videogames: [],
    videogame: {},
    genres: []
}

const rootReducer = (state= initialState, action) => {
    switch(action.type) {
        case GET_VIDEOGAMES: {
            return{
                ...state,
                videogames: action.payload
            } 
        }
        case GET_GAME_BY_ID: {
            const { payload } = action;

            return {
                ...state,
                videogame: payload
            }
        }
        case GET_GENRES: {
            return{
                ...state,
                genres: action.payload
            }
        }

        case GET_GAME_GENRE: {
            const { payload: { genre, videogames } } = action;
            const gamesByGenre = videogames.filter(game => game.genres.filter(el => el.name === genre).length);

            return{
                ...state,
                videogames: gamesByGenre,
            }
        }
        case GET_GAMEDB : {
            const { payload } = action;
            return{
                ...state,
                videogames: payload.filter(game => isNaN(game.id))
            }
        }
        case GET_GAMEAPI: {
            const { payload } = action;
            return {
                ...state,
                videogames: payload.filter(game => !isNaN(game.id)),
            }
        }
        case ORDER_GAMES_BY_RATING: {
            const { payload } = action;
            return {
                ...state,
                videogames: [...state.videogames].sort((a, b) => payload ? a.rating - b.rating : b.rating - a.rating),
            }
        }
        case ORDER_GAMES_BY_NAME: {
            const { payload } = action;
            return {
                ...state,
                videogames: [...state.videogames].sort((a, b) => payload ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)),
            }
        }
        case CREATE_GAME: {
            const { payload } = action;

            let videogames = [...state.videogames]
            videogames.unshift(payload)

            return {
                ...state,
                videogames: videogames,
            }
        }
        case GET_NAME_GAMES: {
            return{
                ...state,
                videogames: action.payload
            }
            
        }
        default: {
            return {
                ...state
            }
        }
    }
};

export default rootReducer;